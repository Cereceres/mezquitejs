const operation = /^\$\$\$(?!\$)(.*)/;

const ckeckOperation = element => element && element.match && element.match(operation);

module.exports = (self, arrayOfKeys = [], source, goInside) => {
  let mapped;
  let operationTo = null;
  const howManyJoins = arrayOfKeys
    .filter(elem => elem && elem.match && elem.match(operation)).length;
  let howManyJoinsIterated = 0;
  for (let i = 0; i < arrayOfKeys.length; i++) {
    const element = arrayOfKeys[i];
    mapped = goInside.call(self, element, source);

    if (ckeckOperation(element)) {
      howManyJoinsIterated += 1;
      continue;
    }

    if (ckeckOperation(arrayOfKeys[i + 1])) operationTo = mapped;

    const operatorMethod = ckeckOperation(arrayOfKeys[i - 1]);
    if (operatorMethod && typeof self[operatorMethod[1]] === 'function') mapped = self[operatorMethod[1]](operationTo, mapped, arrayOfKeys, self);

    if (howManyJoinsIterated >= howManyJoins && mapped) return mapped;
  }
  return mapped;
};
