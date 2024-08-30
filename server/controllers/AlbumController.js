const url = require("url");
const Album = require("../models/Album");
const { jsonParser } = require("../parsers/jsonParser");
const { toJSON } = require("../util/toJSON");

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
      if (err.message === "No album with such id") res.statusCode = 404;
      else res.statusCode = 500;
      res.end(toJSON({message: err.message }));
    }
  }

  static async create(req, res) {
    try {
      const parsedReq = await jsonParser(req);
      const body  = parsedReq.body;
      const album = await Album.create(body);
      console.log(album);
      res.statusCode = 200;
      res.end(album);
    } catch (err) {
      console.error(err);
      if (err.message === "Validation error") res.statusCode = 400;
      else res.statusCode = 500;
      res.end(toJSON({ message: err.message }));
    }
  }
};

module.exports = AlbumController;
