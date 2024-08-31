const { dbQuery } = require("../database/query");
const { toJSON } = require("../util/toJSON");
const { toPgDate } = require("../util/toPgDate");

class Artist {
  static async getAll() {
    return await dbQuery("SELECT * FROM artists;");
  }

  static async getById(id) {
    const artist = await dbQuery(`SELECT * FROM artists WHERE id=${id};`, false);
    if (!artist) throw new Error("No artist with such id" );
    return artist;
  }

  static async create(body) {
    try {
      const properties = ["name", "origin"];
      for (let value of properties) {
        if (body[value] === undefined) throw new Error("Validation error")
      }
      const artist = await dbQuery(`INSERT INTO artists (
        name,
        origin
      ) VALUES (
        '${body.name}',
        '${body.origin}'
      ) RETURNING *;`, false);
      return artist;
    } catch (err) {
      throw new Error("Validation error");
    }
  }
  
  static async delete(id) {
    try {
      const artist = await Artist.getById(id);
      if (!artist) throw new Error("No artist with such id");
      await dbQuery(`DELETE FROM artists WHERE id=${id};`, false);
      return toJSON({ message: "Successfully deleted" });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  static async put(id, body) {
    try {
      const properties = ["name", "origin"];
      for (let value of properties) {
        if (body[value] === undefined) throw new Error("Validation error")
      }
      const artist = await dbQuery(`UPDATE artists SET
        name = '${body.name}', 
        origin = '${body.origin}'
      WHERE id = ${id}
      RETURNING *;`, false);
      return artist;
    } catch (err) {
      console.error(err)
      throw new Error("Validation error");
    }
  }
};

module.exports = Artist;
