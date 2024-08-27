const AlbumController = require("../controllers/AlbumController");

class AlbumRouter {
  static #routes = [];

  static execute(req, res) {
    const url = req.url;
    const method = req.method;
    
    this.#routes.find((route) => {
      if (route.url === url && route.method === method) return route.cb(req, res);
    });
  }

  static get(url, cb) {
    this.#routes.push({ url, cb, method: "GET" });
  }
};

AlbumRouter.get("/albums", AlbumController.getAll);

module.exports = AlbumRouter;
