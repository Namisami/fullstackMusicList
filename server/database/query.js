const db = require("./connect");
const { toJSON } = require("../util/toJSON");

async function dbQuery(sql, many=true) {
  console.log(sql);
  try {
    const data = await db.any(sql);
    if (!many) return toJSON(data[0]);
    return toJSON(data);
  } catch(err) {
    console.error("Error when DB query:", err);
    if (!err.message) throw toJSON({ message: "Error fetching data" });
    throw toJSON({ message: err.message });
  }
};

exports.dbQuery = dbQuery;
