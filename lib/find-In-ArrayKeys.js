const joinOp = require('./join');

const join = '$join';

module.exports = (self, arrayOfKeys = [], source, goInside) => {
  let mapped;
  let joinTo = null;
  const howManyJoins = arrayOfKeys.filter(elem => elem === join).length;
  let howManyJoinsIterated = 0;
  for (let index = 0; index < arrayOfKeys.length; index++) {
    const element = arrayOfKeys[index];
    mapped = goInside.call(self, element, source);

    if (arrayOfKeys[index] === join) {
      howManyJoinsIterated += 1;
      continue;
    }

    if (arrayOfKeys[index + 1] === join) joinTo = mapped;

    if (arrayOfKeys[index - 1] === join) mapped = joinOp(joinTo, mapped);

    if (howManyJoinsIterated >= howManyJoins && mapped) return mapped;
  }

  return mapped;
};
