const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Long = require('long');
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
      // exclude to constants, env/chunk-util.js maybe?
      const minimumBorderChunk = {
        x: -100,
        z: -100
      };

      const maximumBorderChunk = {
        x: 8,
        z: 8
      };
      //

      const centerChunk = req.body.centerChunk;

      if (centerChunk == undefined || centerChunk.x === undefined || centerChunk.z === undefined) {
        return res.status(statusCodes.clientError.badRequest.code).json({
          code: statusCodes.clientError.badRequest.code,
          status: statusCodes.clientError.badRequest.status,
          message: 'Invalid data'
        });
      }

      const normalizedCenterChunk = {
        x: Math.min(Math.max(centerChunk.x, minimumBorderChunk.x), maximumBorderChunk.x),
        z: Math.min(Math.max(centerChunk.z, minimumBorderChunk.z), maximumBorderChunk.z)
      };

      const normalizedMinimumChunk = {
        x: Math.max(minimumBorderChunk.x, normalizedCenterChunk.x - 16),
        z: Math.max(minimumBorderChunk.z, normalizedCenterChunk.z - 16)
      };

      const normalizedMaximumChunk = {
        x: Math.min(maximumBorderChunk.x, normalizedMinimumChunk.x + 32),
        z: Math.min(maximumBorderChunk.z, normalizedMinimumChunk.z + 32)
      };

      const excludeChunks = req.body.excludeChunks;
      let chunkImages = [];

      for (let chunkX = normalizedMinimumChunk.x; chunkX < normalizedMaximumChunk.x; ++chunkX) {
        for (let chunkZ = normalizedMinimumChunk.z; chunkZ < normalizedMaximumChunk.z; ++chunkZ) {
          const chunkID = new Long(chunkX).and(4294967295).or(new Long(chunkZ).and(4294967295).shiftLeft(32)).toString();

          if (excludeChunks !== undefined && excludeChunks.includes(chunkID)) {
            continue;
          }

          const chunkImagePath = path.join(process.env.ROOT_DIRECTORY, 'public', 'chunks', `${chunkID}.png`);

          if (fs.existsSync(chunkImagePath)) {
            chunkImages.push({
              input: chunkImagePath,
              top: (chunkZ - normalizedMinimumChunk.z) * 16,
              left: (chunkX - normalizedMinimumChunk.x) * 16
            });
          }
        }
      }

      const mapImage = await sharp({
        create: {
          width: 512,
          height: 512,
          channels: 4,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }
      }).png().composite(chunkImages);

      return res.status(statusCodes.success.OK.code).contentType('image/png').send(await mapImage.toBuffer());
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChunkController();
