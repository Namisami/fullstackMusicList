const Album = require("../models/Album");

class AlbumController {
  static async getAll(req, res) {
    try {
      const albums = await Album.getAll();
      res.statusCode = 200;
      res.end(albums);
    } catch (err) {
      res.statusCode = 500;
      res.end(err);
    }
  }
};

module.exports = AlbumController;
