const uuidv4 = require('uuid/v4');
const database = require('./database');

module.exports = {
  init() {
    return new Promise(async (resolve, reject) => {
      try {
        await database.init();
      } catch (err) {
        return reject(`Error initializing database: ${err.message}`);
      }

      // Create new client if none exists in database.

      try {
        const clients = await database.Client.findAll();
        if (clients.length === 0) {
          await database.Client.create({uuid: uuidv4()});
        }
      } catch (err) {
        return reject(`Error setting up client: ${err.message}`);
      }

      resolve();
    });
  },
};
