const db = require("../database");
const { toJSON } = require("../util/toJSON");

class Album {
  static async getAll() {
    try {
      const albums = await db.any("SELECT * FROM albums;");
      return toJSON(albums);
    } catch (err) {
      console.error("Error when DB query:", err);
      throw toJSON({ message: "Error fetching data" });
    }
  }
};

module.exports = Album;
