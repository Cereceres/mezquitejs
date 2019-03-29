/* eslint-disable func-names */
const get = require('./lib/get');

const Mezquite = function mez() {
  if (!(this instanceof Mezquite)) return new Mezquite();

  this.methods = new Map();
  this.constants = new Map();
  this.setMethod = function set(name, method) {
    if (!name || !method || typeof method !== 'function') return this;

    this.methods.set(name, method);

    return this;
  };
  this.setConstant = function (name, constant) {
    this.constants.set(name, constant);

    return this;
  };

  this.get = get.bind(this);
};

module.exports = Mezquite;
