const req = require("supertest");
// const app = require("./../server/server.js");
//jest do not required import statement

const server = "http://localhost:3000";
const graphServer = "http://localhost:4000";

describe("Route integration", () => {
  describe("GET /", () => {
    test("responds with status 200 and text/html content type", () => {
      return req(server)
        .get("/")
        .expect("Content-Type", /text\/html/)
        .expect(200);
    });
  });

  describe("POST /api/login", () => {
    describe("Given username and password", () => {
      const graphqlQuery = {
        query: `{
              chapters{
                name
                id
              }
            }`,
      };

      test("POST /graphql", () => {
        return (
          req(graphServer)
            .post("/graphql")
            .send(graphqlQuery)
            .expect("Content-Type", /application\/json/)
        );
      });
      //if wrong email, should get status 401, and a string 'User not found'
      //if no input on email should get status 401, and a string 'User not found'
      //if wrong password, should received status 400 and a string 'Incorrect Password'
      //if correct username and password, should receive status 200 and {email, chapterId(num), firstName, lastName, and token}
      //should specify JSON in the header
    });
  });
});
