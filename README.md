# File Backup

File backup service written in NodeJS. Backs up files to another location on the disk with checksum verification.

### Milestones

- [x] Backup command
- [x] Restore command
- [ ] Make tarballs from directories instead of multiple files
- [ ] Remote file backup
- [ ] Remote file restore

### Usage

```bash
file-backup backup ~/Documents
```

```bash
file-backup restore 1576073346726
```

### Contributing (Quick Start)

Requires node v12.13.1

```bash
npm install
npm run package
```

Inside the dist directory will be three files: one for Windows, one of Linux, and one for MacOS.
