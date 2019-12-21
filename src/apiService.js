const xss = require('xss');
const eq = require('shallow-equal').shallowEqualObjects;

function sanitize(obj) {
  for (let key of Object.keys(obj)) {
    obj[key] = xss(obj[key]);
  }
  //objects are mutated so no need to return
}

const QueueService = {
  getNext(type, req) {
    const queue = req.app.get(`${type}Queue`);
    if (queue.first === null) {
      null;
    }
    const pet = queue.first.value;
    sanitize(pet);
    return pet;
  },

  addPet(type, req) {
    const {
      imageURL,
      imageDescription,
      name,
      sex,
      age,
      breed,
      story
    } = req.body;
    const queue = req.app.get(`${type}Queue`);
    const newPet = { imageURL, imageDescription, name, sex, age, breed, story };
    sanitize(newPet);
    queue.enqueue(newPet);
    return newPet;
  },
  addUser(req) {
    const queue = req.app.get('userQueue');
    const { name } = req.body;
    const newPerson = { name };
    sanitize(newPerson);
    queue.enqueue(newPerson);
    return newPerson;
  },
  getAll(type, req) {
    const queue = req.app.get(`${type}Queue`);
    if (queue.first === null) {
      [];
    }

    let pets = [];
    const lastPet = queue.last.value;
    let pet = null;
    //loop through entire queue, pushing each pet into array of pets and then returning it to the queue
    //when we see the last pet in the loop comparison, the queue is back to its old state and we have every pet in our array
    while (!eq(pet, lastPet)) {
      pet = queue.dequeue();
      pets.push(pet);
      queue.enqueue(pet);
    }
    return pets;
  },
  remove(type, req) {
    const queue = req.app.get(`${type}Queue`);
    return queue.dequeue();
  },

  sendResponse(type, result, res) {
    if (!result) {
      return res.status(404).json({ error: `No ${type}s found.` });
    }
    res.json(result);
  },
  validateType(type, req, res) {
    if (req.app.get('queues').includes(type)) {
      return true;
    }
    this.badEndpoint(res);
    return false;
  },
  badEndpoint(res) {
    //same response as would be returned if each endpoint was individually defined and someone hit a non-existing endpoint
    return res.status(404).json({
      message: 'Not Found',
      error: {}
    });
  }
};

module.exports = QueueService;
