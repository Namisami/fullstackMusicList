const http = require("http");
const AlbumRouter = require("./routes/AlbumRouter");
require("dotenv").config();

const app = http.createServer((req, res) => {
  AlbumRouter.execute(req, res);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // res.end("Hello world");
});

app.listen(port=process.env.PORT || 8000, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});
