const db = require("../database");
const { toJSON } = require("../util/toJSON");

class Album {
  static async getAll() {
    try {
      const albums = await db.any("SELECT * FROM albums;");
      return toJSON(albums);
    } catch(err) {
      console.error("Error when DB query:", err);
      if (!err.message) throw toJSON({ message: "Error fetching data" });
      throw toJSON({ message: err.message });
    }
  }

  static async getById(id) {
    try {
      const album = (await db.any(`SELECT * FROM albums WHERE id=${id};`))[0];
      if (!album) throw new Error("No album with such id");
      return toJSON(album);
    } catch(err) {
      console.error("Error when DB query:", err);
      if (!err.message) throw toJSON({ message: "Error fetching data" });
      throw toJSON({ message: err.message });
    }
  }
};

module.exports = Album;
