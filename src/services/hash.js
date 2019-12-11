const fs = require('fs');
const XXHash = require('xxhash');

module.exports = {
  make(filePath) {
    return new Promise(resolve => {
      const hasher = new XXHash(0xCAFEBABE);

      fs.createReadStream(filePath)
        .on('data', data => {
          hasher.update(data);
        })
        .on('end', () => {
          resolve(hasher.digest());
        });
    });
  },
  check(a, b) {
    return a === b;
  },
};
