const commander = require('commander');
require('sqlite3');
const bootstrap = require('./services/bootstrap');
const program = new commander.Command();

(async () => {
  let client;
  try {
    client = await bootstrap.init();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  program.version('0.0.0');

  program.command('backup <backupDirectory>').action(require('./commands/backup')(client));
  program.command('restore <timestamp>').action(require('./commands/restore')(client));

  program.parse(process.argv);
})();
