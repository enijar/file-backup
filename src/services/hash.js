const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  make(filePath) {
    return new Promise(resolve => {
      const hash = crypto.createHash('sha1');

      fs.createReadStream(filePath)
        .on('data', data => {
          hash.update(data);
        })
        .on('end', () => {
          resolve(hash.digest('hex'));
        });
    });
  },
};
