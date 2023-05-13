const path = require('path');
const FileParsingHelper = require('../helpers/file-parsing-helper');
const FileUploadingHelper = require('../helpers/file-uploading-helper');
const magicNumbers = require('../utils/magic-numbers-util');
const statusCodes = require('../utils/status-codes-util');

const fileParsing = new FileParsingHelper();

fileParsing.setFieldName = 'item';
fileParsing.setFileNameRegex = /^(\d{1,5})_(\d{1,5})$/;
fileParsing.setMimetypes = ['png'];
fileParsing.setMaxFileSize = magicNumbers.eight_bytes;

const fileUploading = new FileUploadingHelper();

fileUploading.setDirectoryName = path.join('public', 'chunks');

class ChunkController {
  async post(req, res, next) {
    try {
      fileParsing.parse(req, (err, file) => {
        if (err) {
          return res.status(statusCodes.clientError.badRequest.code).json({
            code: statusCodes.clientError.badRequest.code,
            status: statusCodes.clientError.badRequest.status,
            message: err.message
          });
        }

        fileUploading.upload(file, (err) => {
          if (err) {
            return res.status(statusCodes.serverError.internalServerError.code).json({
              code: statusCodes.serverError.internalServerError.code,
              status: statusCodes.serverError.internalServerError.status,
              message: err.message
            });
          }

          return res.status(statusCodes.success.OK.code).json({
            code: statusCodes.success.OK.code,
            status: statusCodes.success.OK.status
          });
        });
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChunkController();
