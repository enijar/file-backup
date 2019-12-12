const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');
const database = require('../services/database');
const filesystem = require('../services/filesystem');
const localBackup = require('../services/localBackup');
const cloudBackup = require('../services/cloudBackup');
const hash = require('../services/hash');

const BACKUP_METHODS = ['local', 'cloud'];

module.exports = client => async (backupDirectory, command) => {
  const backupMethod = command.method;

  if (!fs.existsSync(backupDirectory)) {
    console.error(`Directory does not exist: ${backupDirectory}`);
    process.exit(1);
  }

  if (!BACKUP_METHODS.includes(backupMethod)) {
    console.error(`Backup method "${backupMethod}" no recognized. Needs to be one of ${BACKUP_METHODS.join(', ')}`);
    process.exit(1);
  }

  const timestamp = Date.now();
  const files = filesystem.getFilesRecursively(backupDirectory);
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  console.log('\nBacking up files...\n');

  const errors = [];

  progress.start(files.length, 0);

  for (let i = 0, totalFiles = files.length; i < totalFiles; i++) {
    const {filePath, fileName} = files[i];
    const fileHash = await hash.make(filePath);
    let backupLocation;

    try {
      switch (backupMethod) {
        case 'cloud':
          backupLocation = await cloudBackup.make(filePath, fileHash, client.uuid, String(timestamp));
          break;
        case 'local':
          backupLocation = await localBackup.make(filePath, fileHash, path.join(client.backupDir, String(timestamp)));
          break;
      }
    } catch (err) {
      errors.push(`Failed to backup file "${filePath}": ${err.message}\n`);
    }

    files[i] = {filePath, fileName, fileHash, backupLocation, timestamp};
    progress.update(i + 1);
  }

  progress.stop();

  if (errors.length > 0) {
    console.error('\n', errors.join('\n'));
  }

  console.log('\nSaving files...\n');

  try {
    await database.FileBackup.bulkCreate(files);
  } catch (err) {
    console.error(`Error saving backup data: ${err.message}`);
  }

  console.log(`Backup complete, with timestamp of "${timestamp}"`);
};
