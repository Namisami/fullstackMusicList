const { dbQuery } = require("../database/query");
const { toJSON } = require("../util/toJSON");

class Album {
  static async getAll() {
    return await dbQuery("SELECT * FROM albums;");
  }

  static async getById(id) {
    const album = await dbQuery(`SELECT * FROM albums WHERE id=${id};`, false);
    if (!album) throw new Error("No album with such id" );
    return album;
  }

  static async create(body) {
    try {
      const album = await dbQuery(`INSERT INTO albums (
        title, 
        artist_id,
        genre,
        publication_date,
        duration
      ) VALUES (
        '${body.title}',
        ${body.artist_id},
        '${body.genre}',
        '${new Date(body.publication_date).toISOString().split('T')[0]}',
        ${body.duration}
      ) RETURNING *;`, false);
      return album;
    } catch (err) {
      throw new Error("Validation error");
    }
  }
};

module.exports = Album;
