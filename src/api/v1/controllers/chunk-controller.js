class ChunkController {
  async create(req, res, next) {
    try {
      console.log('create');
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next) {
    try {
      console.log('read');
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      console.log('update');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      console.log('delete');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChunkController();
