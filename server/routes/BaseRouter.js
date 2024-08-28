class BaseRouter {
  #routes = [];
  #url = "";
  
  #isSimple() {
    if (Array.isArray(this.#routes)) return true;
    return false;
  }

  add(url, router) {
    if (this.#isSimple) this.#routes = {};
    this.#routes[url] = router.getRoutes()
    this.#url = url;
  }

  get(url, cb) {
    if (this.#isSimple) {
      this.#routes.push({ url, cb, method: "GET" });
      return;
    };
    this.#routes["url"] = { url, cb, method: "GET" };
  }

  getRoutes() {
    return this.#routes;
  }

  execute(req, res) {
    const url = req.url;
    const method = req.method;

    if (this.#isSimple()) {
      this.#routes.find((route) => {
        if (`${this.#url}${route.url}` === url && route.method === method) return route.cb(req, res);
      });
    }

    const urlRoutes = this.#routes[this.#url];

    if (!urlRoutes) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Page not found" }, 2, 2));
      return;
    };

    urlRoutes.find((route) => {
      if (`${this.#url}${route.url}` === url && route.method === method) return route.cb(req, res);
    });
  }
}

module.exports = BaseRouter;
