const FileParsingHelper = require('../helpers/file-parsing-helper');
const statusCodes = require('../utils/status-codes-util');

const fileParsingHelper = new FileParsingHelper();

fileParsingHelper.setFieldName = 'chunk';
fileParsingHelper.setFileNameRegex = /^((\d{1,5})_(\d{1,5}))$/gm;
fileParsingHelper.setMimetypes = ['png'];
fileParsingHelper.setMaxFileSize = 8192; // 8 bytes

class ChunkController {
  async post(req, res, next) {
    try {
      fileParsingHelper.file(req, (err) => {
        if (err) {
          return res.status(statusCodes.clientError.badRequest.code).json({
            code: statusCodes.clientError.badRequest.code,
            status: statusCodes.clientError.badRequest.status,
            message: err.message
          });
        }

        return res.status(statusCodes.success.OK.code).json({
          code: statusCodes.success.OK.code,
          status: statusCodes.success.OK.status
        });
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
