const AlbumController = require("../controllers/AlbumController");
const BaseRouter = require("./BaseRouter");

const albumRouter = new BaseRouter();

albumRouter.get('', AlbumController.getAll);

module.exports = albumRouter;
