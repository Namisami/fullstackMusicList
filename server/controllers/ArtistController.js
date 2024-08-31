const url = require("url");
const Artist = require("../models/Artist");
const { jsonParser } = require("../parsers/jsonParser");
const { toJSON } = require("../util/toJSON");

class ArtistController {
  static async getAll(req, res) {
    try {
      const artists = await Artist.getAll();
      res.statusCode = 200;
      res.end(artists);
    } catch (err) {
      res.statusCode = 500;
      res.end(err);
    }
  }

  static async getById(req, res) {
    try {
      const parsedUrl = url.parse(req.url);
      const id = parsedUrl.pathname.split("/")[2];
      const artist = await Artist.getById(id);
      res.statusCode = 200;
      res.end(artist);
    } catch (err) {
      if (err.message === "No artist with such id") res.statusCode = 404;
      else res.statusCode = 500;
      res.end(toJSON({message: err.message }));
    }
  }

  static async create(req, res) {
    try {
      const parsedReq = await jsonParser(req);
      const body  = parsedReq.body;
      const artist = await Artist.create(body);
      res.statusCode = 201;
      res.end(artist);
    } catch (err) {
      console.error(err);
      if (err.message === "Validation error") res.statusCode = 400;
      else res.statusCode = 500;
      res.end(toJSON({ message: err.message }));
    }
  }
  
  static async delete(req, res) {
    try {
      const parsedUrl = url.parse(req.url);
      const id = parsedUrl.pathname.split("/")[2];
      const deleted = await Artist.delete(id);
      res.statusCode = 200;
      res.end(deleted);
    } catch (err) {
      if (err.message === "No artist with such id") res.statusCode = 404;
      else res.statusCode = 500;
      res.end(toJSON({ message: err.message }));
    }
  }

  static async put(req, res) {
    try {
      const parsedUrl = url.parse(req.url);
      const id = parsedUrl.pathname.split("/")[2];
      const parsedReq = await jsonParser(req);
      const body = parsedReq.body;
      const artist = await Artist.put(id, body);
      console.log(artist);
      res.statusCode = 201;
      res.end(artist);
    } catch (err) {
      console.error(err);
      if (err.message === "Validation error") res.statusCode = 400;
      else res.statusCode = 500;
      res.end(toJSON({ message: err.message }));
    }
  }
};

module.exports = ArtistController;
