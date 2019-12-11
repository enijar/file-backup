const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');
const database = require('../services/database');

module.exports = client => async (timestamp, force = false) => {
  let files;

  try {
    files = await database.FileBackup.findAll({
      where: {
        timestamp,
      },
    });
  } catch (err) {
    console.error(`Failed to restore from backup timestamp "${timestamp}": ${err.message}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error(`No backups found with timestamp "${timestamp}"`);
    process.exit(1);
  }

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  console.log(`\nRestoring files from backup "${timestamp}"...\n`);

  progress.start(files.length, 0);

  for (let i = 0, length = files.length; i < length; i++) {
    const file = files[i];

    if (!fs.existsSync(file.backupLocation)) {
      console.warn(`Missing backup file "${file.backupLocation}"`);
      continue;
    }

    if (!force && fs.existsSync(file.filePath)) {
      console.warn(`File exists "${file.filePath}", skipping. Add --force to overwrite files`);
      continue;
    }

    const restoreDir = file.filePath.substr(0, file.filePath.lastIndexOf(file.fileName));
    const restoreFilePath = path.join(restoreDir, file.fileName);

    if (!fs.existsSync(restoreDir)) {
      fs.mkdirSync(restoreDir, {recursive: true});
    }

    fs.copyFileSync(file.backupLocation, restoreFilePath);
    progress.update(i + 1);
  }

  progress.stop();
};
