
module.exports = (params)=>{
  const {parse, mezquite, refKey, refHereKey, object, source} = params;
  return (previous, [key, value]) => {
    if (!value) return previous;

    const isRefKey = typeof value[refKey] !== 'undefined';
    if (isRefKey) previous[key] = mezquite.get(source, value[refKey]);

    const isRefHereKey = typeof value[refHereKey] !== 'undefined';
    if (isRefHereKey) previous[key] = mezquite.get(object, value[refHereKey]);

    if (!previous[key]) return previous;

    if (typeof previous[key][refKey] !== 'undefined') previous[key] = mezquite.get(source, previous[key][refKey]);

    if (typeof previous[key][refHereKey] !== 'undefined') previous[key] = mezquite.get(object, previous[key][refHereKey]);

    const isPropParseable = typeof previous[key] === 'object' &&
        Object.keys(previous[key]).length;

    if (isPropParseable) previous[key] = parse(previous[key], source);

    return previous;
  };
};
