const fs = require('fs');
const path = require('path');

module.exports = {
  async make(filePath, fileHash, backupDir) {
    const backupLocation = path.join(backupDir, `bk-${fileHash}`);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    fs.copyFileSync(filePath, backupLocation);

    return backupLocation;
  },
};
