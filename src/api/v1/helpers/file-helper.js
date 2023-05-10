const {
  constants,
  promises: { access }
} = require('fs');
const path = require('path');
const pathHelper = require('../helpers/path-helper.js');

class FileHelper {
  async exists(filepath, filename) {
    try {
      const rootPath = await pathHelper.root();

      const filePath = path.join(rootPath, filepath, filename);

      await access(filePath, constants.F_OK);

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new FileHelper();
