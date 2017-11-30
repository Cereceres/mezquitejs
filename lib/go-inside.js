const goInside = function(key = '', source = {}) {
  const self = this;
  const keySplit = !Array.isArray(key) ? key.split('.') : key;
  let map = keySplit[0];
  const inside = keySplit.slice(1) || [];
  let mapped;
  const lookLikeMethod = /^\$.+$/.test(map);

  if (lookLikeMethod) map = map.slice(1);

  const methodLike = self.methods.get(map);
  const isMethod = lookLikeMethod &&
  typeof methodLike === 'function';

  if (isMethod) mapped = methodLike.call(self, source);
  else mapped = source[map] || source['$' + map];
  if (inside.length && mapped) return goInside.call(self, inside, mapped);

  return mapped;
};

module.exports = goInside;
