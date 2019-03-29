/* eslint-disable no-mixed-operators */
const goInside = function go(key = '', source = {}) {
  const self = this;
  const keySplit = typeof key === 'string' ? key.split('.') : key;
  let map = keySplit[0];
  const inside = keySplit.slice(1) || [];
  let mapped;
  console.log('map = ', map);

  const lookLikeMethod = (/^\$(?!\$).+$/).test(map);
  const lookLikeConstant = (/^\$\$(?!\$).+$/).test(map);
  console.log('lookLikeMethod ', lookLikeMethod);
  console.log('lookLikeConstant ', lookLikeConstant);

  if (lookLikeMethod) map = map.slice(1);
  if (lookLikeConstant) map = map.slice(2);

  const methodLike = self.methods.get(map);
  const constantLike = lookLikeConstant
        && (self.constants.get(map)
            || map);
  const isMethod = lookLikeMethod
        && typeof methodLike === 'function';
  console.log('map ', map);
  console.log('source ', source);
  console.log('methodLike ', methodLike);
  console.log('constantLike ', constantLike);

  if (isMethod) mapped = methodLike.call(self, source);
  else if (constantLike) mapped = constantLike;
  else mapped = source[map] || source[`$${map}`];
  if (inside.length && mapped) return goInside.call(self, inside, mapped);
  console.log('mapped ', mapped);

  return mapped;
};
module.exports = goInside;
