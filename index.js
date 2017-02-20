
let goInside = function(key, source) {
  key = key || '';
  source = source || {};

  let keySplit = !Array.isArray(key) ? key.split('.') : key;

  let map = keySplit[0];

  let inside = keySplit.slice(1) || [];

  let mapped;

  let lookLikeMethod = /^\$.+$/.test(map);

  if (lookLikeMethod) map = map.slice(1);

  let isMethod = lookLikeMethod &&
  typeof this.methods[map] === 'function';

  if (isMethod) mapped = this.methods[map].call(this, source);
  else mapped = source[map] || source['$' + map];

  if (inside.length && mapped) return goInside.call(this, inside, mapped);

  return mapped;
};

let Mezquite = module.exports = function() {
  if (!(this instanceof Mezquite)) return new Mezquite();

  this.methods = {};

  this.get = function getter(source, map) {
    map = map || {};
    source = source || {};

    let mapped = {};
    let keys = Object.keys(map);
    let keysSource = Object.keys(source);

    if (!keys.length || !keysSource.length) return mapped;

    let get = function(i) {
      i = i || 0;

      let key = keys[i];
      let usingToMap = map[key];

      mapped[key] = goInside.call(this, usingToMap, source);

      i++;

      if (i < keys.length) return get(i);

      return mapped;
    };

    return get.call(this);
  };
};
