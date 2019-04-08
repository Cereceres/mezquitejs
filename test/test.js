const assert = require('assert');
const Mezquite = require('../index');

const mezquite = new Mezquite();
describe('test to mezquitejs', () => {
  it('should return a object', () => {
    assert(typeof mezquite.get() === 'object');
  });

  it('should map a object with key given', () => {
    const mapped = mezquite.get({ test2: 'test3' }, { test1: 'test2' });
    assert(mapped.test1 === 'test3');
  });

  it('should map a object with key given with a array  and join', () => {
    const mapped = mezquite.get({ test2: 'test3' }, { test1: ['test2', '$join', 'test2'] });
    assert(mapped.test1 === 'test3test3');
  });

  it('should map a object with key given with a array and constant', () => {
    const mapped = mezquite.get({ test2: 'test3' }, { test1: ['test2', '$join', '$$test2'] });
    assert(mapped.test1 === 'test3test2');
  });

  it('should map and return undefined', () => {
    const mapped = mezquite.get('', { test1: 'test2.test3.test4' });
    assert(mapped.test1 === undefined);
  });
  it('should do a loop over all keys given', () => {
    const source = {
      test2: 'test3',
      key2: 'key3',
    };
    const map = {
      test1: 'test2',
      key1: 'key2',

    };
    const mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'test3');
    assert(mapped.key1 === 'key3');
  });

  it('should go inside of a object', () => {
    const source = {
      test2: {
        test3: { test4: 'test5' },
      },
    };
    const map = {
      test1: 'test2.test3.test4',
    };
    const mapped = mezquite.get(source, map);
    assert.equal(mapped.test1, 'test5');
  });

  it('should stop of find a undefined value', () => {
    const source = {
      test2: {
        test3: undefined,
      },
    };
    const map = {
      test1: 'test2.test3.test4',
    };
    const mapped = mezquite.get(source, map);
    assert(!mapped.test1);
  });

  it('should return the value correct with string', () => {
    const source = {
      test2: {
        test3: undefined,
      },
    };
    const map = 'test2.test3.test4';
    const mapped = mezquite.get(source, map);
    assert(mapped === undefined);
  });

  it('should exec the method given', (done) => {
    const source = {
      test2: {
        test3: { test4: 'test5' },
      },
    };
    const map = {
      test1: 'test2.$method.test3.test4',
    };
    let called;
    mezquite.setMethod('method', (mapped) => {
      assert(mapped.test3.test4 === 'test5');
      called = true;
      return mapped;
    });
    const mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'test5');
    if (called) done();
  });

  it('should try to go inside if method is not defined', () => {
    const source = {
      test2: {
        test3: { test4: 'test5' },
      },
    };
    const map = {
      test1: 'test2.$test3.test4',
    };
    const mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'test5');
  });

  it('should return undefined if method given is not defined', () => {
    const source = {
      test2: {
        test3: { test4: 'test5' },
      },
    };
    const map = {
      test1: 'test2.$fake.test3.test4',
    };
    const mapped = mezquite.get(source, map);
    assert(!mapped.test1);
  });

  it('should return the constant value no defined', () => {
    const source = {
      test2: {},
    };
    const map = {
      test1: 'test2.$$const',
    };
    const mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'const');
  });

  it('should return the constant value', () => {
    const source = {
      test2: {},
    };
    const map = {
      test1: 'test2.$$constTest',
    };
    mezquite.setConstant('constTest', 4);
    const mapped = mezquite.get(source, map);
    assert(mapped.test1 === 4);
  });
});
