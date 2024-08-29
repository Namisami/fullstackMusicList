const url = require("url");
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

  static async getById(req, res) {
    try {
      const parsedUrl = url.parse(req.url);
      const id = parsedUrl.pathname.split("/")[2];
      const albums = await Album.getById(id);
      res.statusCode = 200;
      res.end(albums);
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end(err);
    }
  }
};

module.exports = AlbumController;
