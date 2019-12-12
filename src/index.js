require('./bootstrap').then(async client => {
  const commander = require('commander');
  const program = new commander.Command();
  program.version('0.0.1');

  program
    .command('backup <backupDirectory>')
    .option('-m, --method <method>', 'Method of backup to use', 'cloud')
    .action(require('./commands/backup')(client));

  program.command('restore <timestamp>').action(require('./commands/restore')(client));
  program.command('list').action(require('./commands/list')(client));
  program.parse(process.argv);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
