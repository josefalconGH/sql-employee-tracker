// Purpose: Entry point for the application
const CLI = require("./lib/interactions.js");

function init() {
  CLI.promptUser();
  return;
}

init();
