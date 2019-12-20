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

  add(type, req) {
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
  }
};

module.exports = QueueService;
