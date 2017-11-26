const get = require('./lib/get');
const goInside = require('./lib/go-inside');

const Mezquite = module.exports = function() {
  if (!(this instanceof Mezquite)) return new Mezquite();

  this.methods = {};
  this.setMethod = function(name, method) {
    if (!name || !mehtod) return this;

    this.methods[name] = method;

    return this;
  };

  this.get = get.bind(this);
};

Mezquite.goInside = goInside;
