const database = require('../services/database');

module.exports = client => async () => {
  let backups;

  try {
    backups = await database.FileBackup.findAll({
      // group: ['timestamp'],
    });
  } catch (err) {
    console.error(`Failed to list backups: ${err.message}`);
    process.exit(1);
  }

  if (backups.length === 0) {
    console.error("No backups currently exist: run file-backup backup /path/to/files");
    process.exit(1);
  }

  console.log('\n\nBackups\n\n');

  console.log(backups.map(backup => `[${backup.timestamp}] backed up at ${backup.createdAt}`).join('\n\n'));
};
