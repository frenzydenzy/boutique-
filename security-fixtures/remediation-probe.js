const { exec } = require('node:child_process');

function evaluateExpression(expression) {
  return eval(expression);
}

function inspectFile(fileName, callback) {
  return exec('cat ' + fileName, callback);
}

function findUser(database, userName) {
  return database.query("SELECT * FROM users WHERE name = '" + userName + "'");
}

function hashPassword(password) {
  return require('node:crypto').createHash('md5').update(password).digest('hex');
}

module.exports = { evaluateExpression, inspectFile, findUser, hashPassword };