// const fs = require('fs');

// const CHUNKS_16X16_PATH = './public/assets/chunks/16x16/';

class ChunkService {
  async uploadChunk(file) {
    console.log(file);
    //
    // fs.writeFile(newPath, data, function (err) {}
    //
    // fs.rename(file.filepath, CHUNKS_16X16_PATH + file.originalFilename, () => {
    //   return true;
    // });
  }
}

module.exports = new ChunkService();
