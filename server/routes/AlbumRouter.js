const AlbumController = require("../controllers/AlbumController");
const BaseRouter = require("./BaseRouter");

const albumRouter = new BaseRouter();

albumRouter.get('', AlbumController.getAll);
albumRouter.get('/:id', AlbumController.getById);

module.exports = albumRouter;
