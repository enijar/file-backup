require('dotenv').config();
const os = require('os');
const path = require('path');

const configDir = path.resolve(os.homedir(), '.file-backup');

module.exports = {
  defaultBackupDir: path.join(configDir, 'backups'),
  sqliteFilePath: path.join(configDir, 'db.sqlite'),
  configDir,
  cloudStorageHost: process.env.CLOUD_STORAGE_HOST,
  cloudStorageAccessKey: process.env.CLOUD_STORAGE_ACCESS_KEY,
  cloudStorageSecretKey: process.env.CLOUD_STORAGE_SECRET_KEY,
  cloudStorageBucket: process.env.CLOUD_STORAGE_BUCKET,
};
