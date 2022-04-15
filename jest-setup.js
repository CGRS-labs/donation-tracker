//regenerator runtime will help run asyncronus code
const regeneratorRuntime = require("regenerator-runtime");

module.exports = () => {
  global.testServer = require("./server/server.js");
};
