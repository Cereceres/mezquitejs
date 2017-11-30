'use strict';
const assert = require('assert');
const Mezquite = require('./index');
const mezquite = new Mezquite();
describe('test to mezquitejs', () => {
  it('should return a object', function() {
    assert(typeof mezquite.get() === 'object');
  });

  it('should map a object with key given', function() {
    let mapped = mezquite.get({'test2': 'test3'}, {'test1': 'test2'});
    assert(mapped.test1 === 'test3');
  });
  it('should do a loop over all keys given', function() {
    let source = {
      'test2': 'test3',
      'key2': 'key3'
    };
    let map = {
      'test1': 'test2',
      'key1': 'key2'

    };
    let mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'test3');
    assert(mapped.key1 === 'key3');
  });

  it('should go inside of a object', function() {
    let source = {
      'test2': {
        test3: {test4: 'test5'}
      }
    };
    let map = {
      'test1': 'test2.test3.test4'
    };
    let mapped = mezquite.get(source, map);
    assert.equal(mapped.test1, 'test5');
  });

  it('should stop of find a undefined value', function() {
    let source = {
      'test2': {
        test3: undefined
      }
    };
    let map = {
      'test1': 'test2.test3.test4'
    };
    let mapped = mezquite.get(source, map);
    assert(!mapped.test1);
  });

  it('should exec the method given', function(done) {
    let source = {
      'test2': {
        test3: {test4: 'test5'}
      }
    };
    let map = {
      'test1': 'test2.$method.test3.test4'
    };
    let called;
    mezquite.setMethod('method', function(mapped) {
      assert(mapped.test3.test4 === 'test5');
      called = true;
      return mapped;
    });
    let mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'test5');
    if (called) done();
  });

  it('should try to go inside if method is not defined', function() {
    let source = {
      'test2': {
        test3: {test4: 'test5'}
      }
    };
    let map = {
      'test1': 'test2.$test3.test4'
    };
    let mapped = mezquite.get(source, map);
    assert(mapped.test1 === 'test5');
  });

  it('should return undefined if method given is not defined', function() {
    let source = {
      'test2': {
        test3: {test4: 'test5'}
      }
    };
    let map = {
      'test1': 'test2.$fake.test3.test4'
    };
    let mapped = mezquite.get(source, map);
    assert(!mapped.test1);
  });
});
