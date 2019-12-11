const commander = require('commander');
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

  program.parse(process.argv);
})();
