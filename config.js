const os = require('os');
const path = require('path');

const configDir = path.resolve(os.homedir(), '.file-backup');

module.exports = {
  defaultBackupDir: path.join(configDir, 'backups'),
  sqliteFilePath: path.join(configDir, 'db.sqlite'),
  configDir,
};
