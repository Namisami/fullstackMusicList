const http = require("http");
const BaseRouter = require('./routes/BaseRouter');
const AlbumController = require("./controllers/AlbumController");
const albumRouter = require("./routes/AlbumRouter");
require("dotenv").config();

const router = new BaseRouter();
router.add('/albums', albumRouter);
// router.get('/albums', AlbumController.getAll)

const app = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  router.execute(req, res);
  // AlbumRouter.execute(req, res);
});

app.listen(port=process.env.PORT || 8000, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});
