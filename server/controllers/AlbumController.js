const Album = require("../models/Album");

class AlbumController {
  static async getAll(req, res) {
    try {
      const albums = await Album.getAll();
      res.statusCode = 200;
      console.log(albums);
      res.end(JSON.stringify(albums, 2, 2));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Data fetching error' }, 2, 2));
    }
  }
};

module.exports = AlbumController;
