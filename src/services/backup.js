const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports = {
  make(filePath, fileName, uuid, timestamp) {
    const uuidDir = path.join(config.backupFilePath, uuid);
    const timestampDir = path.join(uuidDir, String(timestamp));
    const backupLocation = path.join(timestampDir, fileName);

    if (!fs.existsSync(uuidDir)) {
      fs.mkdirSync(uuidDir);
    }

    if (!fs.existsSync(timestampDir)) {
      fs.mkdirSync(timestampDir);
    }

    fs.copyFileSync(filePath, backupLocation);

    return backupLocation;
  },
};
