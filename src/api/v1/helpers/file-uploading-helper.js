const path = require('path');
const fs = require('fs');
const PathHelper = require('../helpers/path-helper');

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
    const rootDirectory = await PathHelper.getRootDirectory();

    const newPath = path.join(rootDirectory, this.directoryName, file.originalFilename);

    try {
      fs.renameSync(file.filepath, newPath);

      return callback(null);
    } catch (err) {
      return callback(err);
    }
  }
}

module.exports = FileUploadingHelper;
