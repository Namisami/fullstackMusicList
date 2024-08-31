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

  post(url, cb) {
    this.#routes.push({ url, cb, method: "POST" });
    return;
  }

  delete(url, cb) {
    this.#routes.push({ url, cb, method: "DELETE" });
    return;
  }

  put(url, cb) {
    this.#routes.push({ url, cb, method: "PUT" });
    return;
  }

  getRoutes() {
    return this.#routes;
  }

  execute(req, res) {
    const url = req.url;
    const method = req.method;

    const route = this.#findRoute(url, method);
    if (route) return route.cb(req, res);

    res.statusCode = 404;
    return res.end(toJSON({ message: "Page not found" }));
  }

  #findRoute(url, method) {
    const route = this.#routes.find((route) => {
      if (route.method !== method) return;
      
      const routeUrlList = route.url.split("/");
      routeUrlList.forEach((routeUrl, index) => {
        if (routeUrl.slice(0, 1) === ":") routeUrlList[index] = "\\d+";
      });

      const regex = new RegExp(routeUrlList.join("\/"));
      let match = url.match(regex);
      if (match) match = match[0];
      if (match === url) return route;
    });
    return route;
  }
}

module.exports = BaseRouter;
