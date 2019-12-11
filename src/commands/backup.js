const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');
const database = require('../services/database');
const filesystem = require('../services/filesystem');
const backup = require('../services/backup');
const hash = require('../services/hash');

module.exports = client => async backupDirectory => {
  if (!fs.existsSync(backupDirectory)) {
    console.error(`Directory does not exist: ${backupDirectory}`);
    process.exit(1);
  }

  const timestamp = Date.now();
  const files = filesystem.getFilesRecursively(backupDirectory);
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  console.log('\nBacking up files...\n');

  progress.start(files.length, 0);

  for (let i = 0, totalFiles = files.length; i < totalFiles; i++) {
    const {filePath, fileName} = files[i];
    const fileHash = await hash.make(filePath);
    const backupLocation = await backup.make(filePath, fileHash, path.join(client.backupDir, String(timestamp)));
    files[i] = {filePath, fileName, fileHash, backupLocation, timestamp};
    progress.update(i + 1);
  }

  progress.stop();

  console.log('\nSaving files...\n');

  try {
    await database.FileBackup.bulkCreate(files);
  } catch (err) {
    console.error(`Error saving backup data: ${err.message}`);
  }

  console.log(`Backup complete, with timestamp of "${timestamp}"`);
};
