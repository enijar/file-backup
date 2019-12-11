const fs = require('fs');
const path = require('path');

module.exports = {
  getFilesRecursively(dirPath, ignoreDotFiles = true) {
    const collectedFiles = [];

    (function collectFiles(dirPath) {
      const files = fs.readdirSync(dirPath);

      for (let i = 0; i < files.length; i++) {
        const fileName = files[i];

        if (ignoreDotFiles && fileName.startsWith('.')) {
          continue;
        }

        const filePath = path.join(dirPath, fileName);

        if (fs.statSync(filePath).isDirectory()) {
          collectFiles(filePath);
          continue;
        }

        collectedFiles.push({filePath, fileName});
      }
    })(dirPath);

    return collectedFiles;
  },
};
