const db = require("../database/connect");
const { dbQuery } = require("../database/query");
const { toJSON } = require("../util/toJSON");
const { toPgDate } = require("../util/toPgDate");

class Album {
  static async getAll() {
    let albums = JSON.parse(await dbQuery("SELECT * FROM albums;"));
    albums.sort((a, b) => a.id - b.id);
    albums = toJSON(albums);
    return albums;
  }

  static async getById(id) {
    const album = await dbQuery(`SELECT * FROM albums WHERE id=${id};`, false);
    if (!album) throw new Error("No album with such id" );
    return album;
  }

  static async create(body) {
    try {
      const properties = ["title", "artist_id", "genre", "publication_date", "duration"];
      for (let value of properties) {
        if (body[value] === undefined) throw new Error("Validation error")
      }
      const album = await dbQuery(`INSERT INTO albums (
        title, 
        artist_id,
        genre,
        publication_date,
        duration
      ) VALUES (
        '${body.title}',
        ${artist_id},
        '${body.genre}',
        '${toPgDate(body.publication_date)}',
        ${body.duration}
      ) RETURNING *;`, false);
      return album;
    } catch (err) {
      throw new Error("Validation error");
    }
  }
  
  static async delete(id) {
    try {
      const album = await Album.getById(id);
      if (!album) throw new Error("No album with such id");
      await dbQuery(`DELETE FROM albums WHERE id=${id};`, false);
      return toJSON({ message: "Successfully deleted" });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  static async put(id, body) {
    try {
      const properties = ["title", "artist_id", "genre", "publication_date", "duration"];
      for (let value of properties) {
        if (body[value] === undefined) throw new Error("Validation error")
      }
      let artist_id = (await db.query(`SELECT id FROM artists WHERE name='${body.artist_id}';`))[0]?.id;
      if (!artist_id) {
        artist_id = (await db.query(`INSERT INTO artists (name) VALUES ('${body.artist_id}') RETURNING id;`))[0].id;
      };
      const album = await dbQuery(`UPDATE albums SET
        title = '${body.title}', 
        artist_id = ${artist_id},
        genre = '${body.genre}',
        publication_date = '${toPgDate(body.publication_date)}',
        duration = ${body.duration}
      WHERE id = ${id}
      RETURNING *;`, false);
      return album;
    } catch (err) {
      console.error(err)
      throw new Error("Validation error");
    }
  }
};

module.exports = Album;
