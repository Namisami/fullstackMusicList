const http = require("http");
const BaseRouter = require('./routes/BaseRouter');
const albumRouter = require("./routes/AlbumRouter");
const artistRouter = require("./routes/ArtistRouter");
require("dotenv").config();

const router = new BaseRouter();
router.add('/albums', albumRouter);
router.add('/artists', artistRouter);

const app = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  return router.execute(req, res);
});

app.listen(port=process.env.PORT || 8000, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});
