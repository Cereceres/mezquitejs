const goInside = require('./go-inside');

module.exports = function(source = {}, map = {}) {
  const self = this;

  if (typeof map === 'string') return goInside.call(self, map, source);
  const mapped = {};
  const keysMap = Object.keys(map);
  const keysSource = Object.keys(source);

  if (!keysMap.length || !keysSource.length) return mapped;

  const get = function(i) {
    i = i || 0;
    const key = keysMap[i];
    const usingToMap = map[key];
    mapped[key] = goInside.call(self, usingToMap, source);
    i++;

    if (i < keysMap.length) return get(i);

    return mapped;
  };

  return get.call(self);
};
