const supertest = require("supertest");
const app = require("./../server/server.js");

const server = "http://localhost:3000";

describe("Route integration", () => {
  describe("GET /", () => {
    it("responds with status 200 and text/html content type", () => {
      return app(server)
        .get("/")
        .expect("Content-Type", /text\/html/)
        .expect(200);
    });
  });

  describe("POST /api/login", () => {
    describe("Given username and password", () => {
      //if wrong email, should get status 401, and a string 'User not found'
      //if no input on email should get status 401, and a string 'User not found'
      //if wrong password, should received status 400 and a string 'Incorrect Password');
      //if correct username and password, should receive status 200 and {email: userInfo.email, chapterId, firstName, lastName, and token
    });
  });
});
