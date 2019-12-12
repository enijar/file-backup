const fs = require('fs');
const Minio = require('minio');
const config = require('../../config');

let client;

module.exports = {
  async make(filePath, fileHash, clientId, timestamp) {
    // Create only one instance of the client
    if (client === undefined) {
      client = new Minio.Client({
        endPoint: config.cloudStorageHost,
        useSSL: true,
        accessKey: config.cloudStorageAccessKey,
        secretKey: config.cloudStorageSecretKey,
      });
    }

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath);
      const storagePath = `${clientId}/${timestamp}/${fileHash}`;

      client.putObject(config.cloudStorageBucket, storagePath, fileStream, err => {
        if (err) {
          return reject(err);
        }
        resolve(`https://${config.cloudStorageHost}/${storagePath}`);
      });
    });
  },
};
