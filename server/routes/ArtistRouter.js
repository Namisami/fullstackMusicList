const ArtistController = require("../controllers/ArtistController");
const BaseRouter = require("./BaseRouter");

const artistRouter = new BaseRouter();

artistRouter.get('', ArtistController.getAll);
artistRouter.get('/:id', ArtistController.getById);
artistRouter.post('', ArtistController.create);
artistRouter.delete('/:id', ArtistController.delete);
artistRouter.put('/:id', ArtistController.put);

module.exports = artistRouter;
