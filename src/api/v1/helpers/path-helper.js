const { dirname } = require('path');
const {
  constants,
  promises: { access }
} = require('fs');

class PathHelper {
  async root() {
    for (const path of module.paths) {
      try {
        await access(path, constants.F_OK);

        return dirname(path);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }
}

module.exports = new PathHelper();
