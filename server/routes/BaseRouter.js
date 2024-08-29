const { toJSON } = require("../util/toJSON");

class BaseRouter {
  #routes = [];

  add(url, router) {
    const newRoutes = router.getRoutes().map((route) => ({ ...route, url: `${url}${route.url}` }));
    this.#routes = this.#routes.concat(newRoutes);
  }

  get(url, cb) {
    this.#routes.push({ url, cb, method: "GET" });
    return;
  }

  getRoutes() {
    return this.#routes;
  }

  execute(req, res) {
    const url = req.url;
    const method = req.method;

    const route = this.#routes.find((route) => {
      if (`${route.url}` === url && route.method === method) return route;
    });
    if (route) return route.cb(req, res);

    res.statusCode = 404;
    return res.end(toJSON({ message: "Page not found" }));
  }
}

module.exports = BaseRouter;
