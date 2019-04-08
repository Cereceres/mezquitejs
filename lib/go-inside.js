/* eslint-disable no-mixed-operators */

const findInArrayKey = require('./find-In-ArrayKeys');

const goInside = function go(key = '', source = {}) {
  const self = this;

  if (Array.isArray(key)) return findInArrayKey(self, key, source, goInside);

  const keySplit = typeof key === 'string' ? key.split('.') : key;
  let map = keySplit[0];
  const inside = keySplit.slice(1) || [];
  let mapped;

  const lookLikeMethod = (/^\$(?!\$).+$/).test(map);
  const lookLikeConstant = (/^\$\$(?!\$).+$/).test(map);

  if (lookLikeMethod) map = map.slice(1);
  if (lookLikeConstant) map = map.slice(2);

  const methodLike = self.methods.get(map);
  const constantLike = lookLikeConstant
            && (self.constants.get(map)
                  || map);
  const isMethod = lookLikeMethod
            && typeof methodLike === 'function';

  if (isMethod) mapped = methodLike.call(self, source);
  else if (constantLike) mapped = constantLike;
  else mapped = source[map] || source[`$${map}`];

  if (inside.length && mapped) return goInside.call(self, inside.join('.'), mapped);
  return mapped;
};
module.exports = goInside;
