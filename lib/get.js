/* eslint-disable func-names */
const goInside = require('./go-inside');

module.exports = function mapper(source = {}, map = {}) {
  const self = this;

  if (typeof source === 'undefined') return map;

  if (typeof map === 'string') return goInside.call(self, map, source);

  const mapped = {};
  const keysMap = Object.keys(map);
  const keysSource = Object.keys(source);

  if (!keysMap.length || !keysSource.length) return mapped;

  const get = function (i) {
    i = i || 0;
    const key = keysMap[i];
    const usingToMap = map[key];
    if (typeof usingToMap === 'string') mapped[key] = goInside.call(self, usingToMap, source);
    else mapped[key] = usingToMap;
    i++;

    if (i < keysMap.length) return get(i);

    return mapped;
  };

  return get.call(self);
};
