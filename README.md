# File Backup

File backup service written in NodeJS. Backs up files to another location on the disk with checksum verification.

### Milestones

- [x] Backup command
- [x] Restore command
- [ ] Make tarballs from directories instead of multiple files
- [ ] Remote file backup
- [ ] Remote file restore
- [ ] Make config configurable by user
- [ ] 100% test coverage
- [ ] Automate release cycle
- [ ] Write Windows and Linux installation guide

### Installation (MacOS)

```bash
curl -L -o file-backup https://github.com/Enijar/file-backup/releases/download/0.0.1/file-backup
chmod +x file-backup
mv file-backup /usr/local/bin/file-backup
```

### Usage

**Backup command**

This command will backup all files inside a directory to ~/.file-backup/backups.

```bash
file-backup backup ~/Documents
```

**Restore command**

This command will restore files to their original locations using the original backup timestamp.

```bash
file-backup restore 1576073346726
```

**List command**

This command will list all backups with their timestamps and date of backup.

```bash
file-backup list
```

### Contributing (Quick Start)

Requires node v12.13

```bash
npm install
npm run package
```

Inside the dist directory will be three files: one for Windows, one of Linux, and one for MacOS.
