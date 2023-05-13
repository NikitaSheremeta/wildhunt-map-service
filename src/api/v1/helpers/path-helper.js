const { dirname } = require('path');
const { access, constants } = require('node:fs/promises');

class PathHelper {
  async getRootDirectory() {
    for (const path of module.paths) {
      try {
        await access(path, constants.R_OK | constants.W_OK);

        return dirname(path);

        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }
}

module.exports = new PathHelper();
