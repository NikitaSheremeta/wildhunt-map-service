const path = require('path');
const fs = require('fs');

class FileUploadingHelper {
  constructor(directoryName = '') {
    this.directoryName = directoryName;
  }

  set setDirectoryName(value) {
    if (value) {
      this.directoryName = value;
    }
  }

  async upload(file, callback) {
    const newPath = path.join(process.env.ROOT_DIRECTORY, this.directoryName, file.originalFilename);

    try {
      fs.renameSync(file.filepath, newPath);

      return callback(null);
    } catch (err) {
      return callback(err);
    }
  }
}

module.exports = FileUploadingHelper;
