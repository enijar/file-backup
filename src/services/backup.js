const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports = {
  make(filePath, fileName, timestamp) {
    const backupDir = path.join(config.paths.backup, String(timestamp));
    const backupLocation = path.join(backupDir, fileName);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    fs.copyFileSync(filePath, backupLocation);

    return backupLocation;
  },
};
