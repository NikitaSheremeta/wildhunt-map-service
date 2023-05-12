const chunkService = require('../services/chunk-service');
const statusCodes = require('../utils/status-codes-util');
// const fileHelper = require('../helpers/file-helper');
// const pathHelper = require('../helpers/path-helper');

class ChunkController {
  async post(req, res, next) {
    try {
      const { file } = req;

      const upload = await chunkService.uploadChunk(file);

      if (!upload) {
        return res.status(statusCodes.clientError.badRequest.code).json({
          status: statusCodes.clientError.badRequest.status
        });
      }

      res.status(statusCodes.success.OK.code).json({
        message: statusCodes.success.OK.status
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      console.log('get');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChunkController();
