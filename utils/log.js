const chalk = require("chalk");


/**
 * 
 * @param {String} message 
 * @param {String} type, success / error 
 */
function log(message, type) {
  switch (type) {
    case "success":
      console.log(chalk.black.bgGreen(message));
      break;
    case "error":
      console.log(chalk.black.bgRed(message));
      break;
    default:
      console.log(chalk.cyan(message));
      break;
  }
}

module.exports = log;
