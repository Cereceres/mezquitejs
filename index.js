const get = require('./lib/get');

const Mezquite = module.exports = function() {
    if (!(this instanceof Mezquite)) return new Mezquite();

    this.methods = new Map();
    this.setMethod = function(name, method) {
        if (!name || !method || typeof method !== 'function') return this;

        this.methods.set(name, method);

        return this;
    };

    this.get = get.bind(this);
};
