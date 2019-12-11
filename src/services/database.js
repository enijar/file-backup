const {Sequelize, Model, DataTypes} = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize('fileBackups', '', '', {
  dialect: 'sqlite',
  storage: config.sqliteFilePath,
  logging: false,
});

// @todo move model definitions to own files

class FileBackup extends Model {
  //
}

FileBackup.init({
  filePath: DataTypes.STRING(1024),
  fileName: DataTypes.STRING(1024),
  fileHash: DataTypes.STRING(1024),
  backupLocation: DataTypes.STRING(1024),
  timestamp: DataTypes.TIME,
}, {sequelize, timestamps: true});

class Client extends Model {
  //
}

Client.init({
  uuid: DataTypes.STRING,
}, {sequelize, timestamps: true});

module.exports = {
  FileBackup,
  Client,
  init(forceSync = false) {
    return new Promise(async (resolve, reject) => {
      try {
        await sequelize.sync({force: forceSync});
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
};
