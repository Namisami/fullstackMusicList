const db = require("../database");

class Album {
  static async getAll() {
    try {
      const albums = await db.any("SELECT * FROM albums;");
      return albums;
    } catch (err) {
      console.error("Error when DB query:", err);
      throw err;
    }
  }
};

module.exports = Album;
