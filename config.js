const path = require('path');

const storageDirPath = path.resolve(__dirname, 'storage');
const dataDirPath = path.join(storageDirPath, 'data');

module.exports = {
  storageDirPath,
  dataDirPath,
  sqliteFilePath: path.join(dataDirPath, 'db.sqlite'),
  backupFilePath: path.join(storageDirPath, 'backup'),
};
