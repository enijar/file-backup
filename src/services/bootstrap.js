const fs = require('fs');
const uuidv4 = require('uuid/v4');
const database = require('./database');
const config = require('../../config');

module.exports = {
  init() {
    return new Promise(async (resolve, reject) => {
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
  },
};
