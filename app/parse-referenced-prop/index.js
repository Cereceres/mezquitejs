const Mezquite = require('../../index');
const mezquite = new Mezquite();
const getReducer = require('./get-reducer');
const refKey = process.env.REF_KEY || '__$ref';
const refHereKey = process.env.REF_KEY || refKey + 'Here';
const parse = module.exports = (object, source = object) => {
  const paramsToGetReducer = {
    parse,
    mezquite,
    refKey,
    refHereKey,
    object,
    source
  };
  const reducer = getReducer(paramsToGetReducer);
  return Object
    .entries(object)
    .reduce(reducer, object);
};
