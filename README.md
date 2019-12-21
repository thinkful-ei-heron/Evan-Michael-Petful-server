## Contributors

Evan Vogts
Michael Kirsch

## API

GET /api/cat or /api/dog to view the next animal in the respective queue.
Returns JSON representation of the animal.

    GET /api/dog

    {
      "imageURL": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Mops_oct09_cropped2.jpg",
      "imageDescription": "Cute pup on a walk",
      "name": "Felicia",
      "sex": "F",
      "age": 2,
      "breed": "Pug",
      "story": "Her owner passed away soon after Felicia was born"
    }

GET /api/user to view the next person in line to adopt an animal, learning their name and their interest in adopting a cat or dog.

    GET /api/user

    {
      "name": "John",
      "cat": true,
      "dog": true
    }

POST /api/cat or /api/dog to add an animal to the respective queue. Accepts keys as above. All keys are required. If successful, returns JSON representation of the added animal.

POST /api/user to add a user to the line. All keys are required. If successful, returns JSON representation of the added user.

DELETE /api/user /api/cat /api/dog: dequeue from the respective queue, returning a JSON representation of the dequeued entity.

When the person at the front of the line adopts an animal, DELETE /api/user and /api/cat or /api/dog (as appropriate)

This is deployed on https://thawing-brushlands-60226.herokuapp.com/api/dog/all in a demo mode, with cats, dogs, and users cycling through. The fake users are named 'John', 'Paul', 'George', or 'Ringo'. If you wish to test a client against this demo, avoid using these names.
