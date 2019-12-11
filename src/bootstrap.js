const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const config = require('../config');

module.exports = new Promise(async (resolve, reject) => {
  const execDir = path.dirname(process.execPath);
  const bindingSrcFile = path.resolve(__dirname, '..', 'bindings', 'sqlite3', 'node-v72-darwin-x64', 'node_sqlite3.tmp');
  const bindingDestDir = path.join(execDir, 'node_modules', 'sqlite3', 'lib', 'binding', 'node-v72-darwin-x64');

  process.chdir(execDir);

  fs.mkdirSync(bindingDestDir, {recursive: true});
  fs.writeFileSync(path.join(bindingDestDir, 'node_sqlite3.node'), fs.readFileSync(bindingSrcFile));

  const database = require('./services/database');

  if (!fs.existsSync(config.configDir)) {
    fs.mkdirSync(config.configDir, {recursive: true});
  }

  try {
    await database.init();
  } catch (err) {
    return reject(`Error initializing database: ${err.message}`);
  }

  // Create new client if none exists in database.

  let client;

  try {
    const clients = await database.Client.findAll();
    if (clients.length === 0) {
      client = await database.Client.create({uuid: uuidv4()});
    } else {
      client = clients[0];
    }
  } catch (err) {
    return reject(`Error setting up client: ${err.message}`);
  }

  if (!fs.existsSync(client.backupDir)) {
    fs.mkdirSync(client.backupDir, {recursive: true});
  }

  resolve(client);
});
