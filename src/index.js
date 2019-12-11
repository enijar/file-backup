const commander = require('commander');
const bootstrap = require('./services/bootstrap');
const program = new commander.Command();

(async () => {
  try {
    await bootstrap.init();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  program.version('0.0.0');

  program.command('dir <dirPath>').action(require('./commands/dir'));

  program.parse(process.argv);
})();

