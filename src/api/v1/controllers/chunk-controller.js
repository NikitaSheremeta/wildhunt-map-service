const path = require('path');
const FileParsingHelper = require('../helpers/file-parsing-helper');
const FileUploadingHelper = require('../helpers/file-uploading-helper');
const FileSelectionHelper = require('../helpers/file-selection-helper');
const magicNumbers = require('../utils/magic-numbers-util');
const statusCodes = require('../utils/status-codes-util');

const fileParsing = new FileParsingHelper();

fileParsing.setParameterName = 'chunk';
fileParsing.setFileNameRegex = /^[ -]?(\d{1,19})$/;
fileParsing.setMimetypes = ['png'];
fileParsing.setMaxFileSize = magicNumbers.twelve_bytes;

const fileUploading = new FileUploadingHelper();

fileUploading.setDirectoryName = path.join('public', 'chunks');

const fileSelectionHelper = new FileSelectionHelper();

fileSelectionHelper.setFileNameRegex = /^[ -]?(\d{1,20})\.(png)$/;

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

          res.status(statusCodes.success.OK.code).json({
            code: statusCodes.success.OK.code,
            status: statusCodes.success.OK.status
          });
        });
      });
    } catch (err) {
      next(err);
    }
  }

  // async get(req, res, next) {
  //   try {
  //     await fileSelectionHelper.select(req, (err, filePath) => {
  //       if (err) {
  //         return res.status(statusCodes.clientError.notFound.code).json({
  //           code: statusCodes.clientError.notFound.code,
  //           status: statusCodes.clientError.notFound.status,
  //           message: err.message
  //         });
  //       }
  //
  //       res.status(statusCodes.success.OK.code).sendFile(filePath);
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async get(req, res, next) {
    try {
      // New logic here
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChunkController();
