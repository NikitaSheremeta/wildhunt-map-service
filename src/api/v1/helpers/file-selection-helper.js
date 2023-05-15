const path = require('path');
const { access, constants } = require('node:fs/promises');

class FileSelectionHelper {
  constructor(fileNameRegex) {
    this.fileNameRegex = fileNameRegex;
  }

  set setFileNameRegex(value) {
    if (value) {
      this.fileNameRegex = value;
    }
  }

  _fileValidation(name) {
    if (this.fileNameRegex) {
      if (!this.fileNameRegex.test(name)) {
        return `Invalid file name, should be: ${this.fileNameRegex}`;
      }
    }

    return '';
  }

  async select(req, callback) {
    const fileValidation = this._fileValidation(req.params.name);

    if (fileValidation) {
      return callback(new Error(fileValidation));
    }

    const chunkPath = path.join(process.env.ROOT_DIRECTORY, 'public', 'chunks', req.params.name);

    try {
      await access(chunkPath, constants.R_OK | constants.W_OK);

      return callback(null, chunkPath);
    } catch (err) {
      const missedChunkPath = path.join(process.env.ROOT_DIRECTORY, 'public', 'chunks', 'missed_chunk.png');

      return callback(null, missedChunkPath);
    }
  }
}

module.exports = FileSelectionHelper;
