var app = (exports = module.exports = {});
var methods = require("methods");

var slice = Array.prototype.slice;

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  //for holding the application router
  this._router = undefined;
};

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({});
  }
};

methods.forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter();

    var route = this._router.route(path);

    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});
