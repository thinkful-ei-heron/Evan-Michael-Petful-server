const server = require('../src/server');
const app = server.app;
const contents = require('../src/PetQueue');

const endpoints = ['cat', 'dog', 'user'];

describe('App', () => {
  context('Given no animals or users', () => {
    beforeEach(() => server.clearAll());
    for (let endpoint of endpoints) {
      it(`GET /api/${endpoint} responds with 200 and a message informing the client that there are currently no ${endpoint}s in queue`, () => {
        return supertest(app)
          .get(`/api/${endpoint}`)
          .expect(200, { status: `${endpoint} queue empty` });
      });
    }
    for (let endpoint of endpoints) {
      it(`GET /api/${endpoint}/all responds with 200 and an empty array`, () => {
        return supertest(app)
          .get(`/api/${endpoint}/all`)
          .expect(200, []);
      });
    }
  });
  context('Given animals and users', () => {
    beforeEach(() => {
      server.clearAll();
      server.setTestContents();
    });
    for (let endpoint of endpoints) {
      it(`GET /api/${endpoint} responds with 200 and a JSON representation of the first ${endpoint}`, () => {
        const key = `${endpoint}Array`;
        const expected = contents[key][0];
        return supertest(app)
          .get(`/api/${endpoint}`)
          .expect(200, expected);
      });
    }
    for (let endpoint of endpoints) {
      it(`GET /api/${endpoint}/all responds with 200 and a JSON representation of all ${endpoint}s in queue`, () => {
        const key = `${endpoint}Array`;
        const expected = contents[key];
        return supertest(app)
          .get(`/api/${endpoint}/all`)
          .expect(200, expected);
      });
    }
  });
});
