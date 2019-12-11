const path = require('path');

const storageDirPath = path.resolve(__dirname, 'storage');
const dataDirPath = path.join(storageDirPath, 'data');

module.exports = {
  sqliteFilePath: path.join(dataDirPath, 'db.sqlite'),
  paths: {
    storage: storageDirPath,
    data: dataDirPath,
    backup: path.join(storageDirPath, 'backup'),
  },
};
