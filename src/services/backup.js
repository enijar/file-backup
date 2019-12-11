const fs = require('fs');
const path = require('path');

module.exports = {
  async make(filePath, fileName, backupDir) {
    const backupLocation = path.join(backupDir, fileName);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    fs.copyFileSync(filePath, backupLocation);

    return backupLocation;
  },
};
