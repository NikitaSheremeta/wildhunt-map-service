const formidable = require('formidable');
const fs = require('fs');
const fileHelper = require('../helpers/file-helper');
const pathHelper = require('../helpers/path-helper');

const CHUNKS_16X16_PATH = './public/assets/chunks/16x16/';

const incomingForm = new formidable.IncomingForm();

class ChunkController {
  async post(req, res, next) {
    try {
      incomingForm.parse(req, (error, fields, { file }) => {
        if (!file) {
          // eslint-disable-next-line no-magic-numbers
          res.status(400);

          res.json({
            message: 'Bad Request'
          });

          return;
        }

        fs.rename(file.filepath, CHUNKS_16X16_PATH + file.originalFilename, () => {
          // eslint-disable-next-line no-magic-numbers
          res.status(200);

          res.json({
            message: 'OK'
          });
        });
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const isExists = await fileHelper.exists(CHUNKS_16X16_PATH, `${req.query.name}.png`);

      if (!isExists) {
        // eslint-disable-next-line no-magic-numbers
        res.status(404);

        res.json({
          message: 'Not Found'
        });

        return;
      }

      const rootPath = await pathHelper.root();

      // eslint-disable-next-line no-magic-numbers
      res.status(200);

      res.sendFile(CHUNKS_16X16_PATH + `${req.query.name}.png`, { root: rootPath });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChunkController();
