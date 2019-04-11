[![Build Status](https://travis-ci.org/Cereceres/mezquitejs.svg?branch=master)](https://travis-ci.org/Cereceres/mezquitejs)

# Mezquitejs
Util to map objects going inside of a object.


![MezquiteLogo](mezquite.jpg)

# Install

```bash
$ npm instal mezquite --save
```
# Use

```js
let mezquite = new require('mezquite')()
let source = {
  'test2': {
    test3: {test4: 'test5'}
  }
};
// with the map object you can go inside of source
let map = {
  'test1': 'test2.test3.test4'
};
let mapped = mezquite.get(source, map);
assert.equal(mapped.test1, 'test5');

```

You can define in methods property a set of functions to be used in your maps.

```js
let source = {
  'test2': {
    test3: {test4: 'test5'}
  }
};
let map = {
  'test1': 'test2.$method.test3.test4'
};
let called;
mezquite.setMethod('methodName', function(mapped) {
  // every method receive the value mapped until now
  // mapped = {
  //  test3: {test4: 'test5'}
  // }
  // The value is not cloned
  assert(mapped.test3.test4 === 'test5');
  // you can modify it or return other value
  mapped.test3.test4 = 'test6'
  return mapped;

  // or
  //
  // return {
  //   test3: {
  //   test4: 'test6'
  //    }
  // }
})
let mapped = mezquite.get(source, map);
assert(mapped.test1 === 'test6');
mapped = mezquite.get({ test2: 'test3' }, { test1: ['notExists', 'test2'] });
assert(mapped.test1 === 'test3');
mezquite.join = (a, b) => b + a;
mapped = mezquite.get({ test2: 'test3' }, { test1: ['test2', '$$$join', 'test2'] });
assert(mapped.test1 === 'test3test3');
mezquite.join = (a, b) => a + b;
mapped = mezquite.get({ test2: 'test3' }, { test1: ['test2', '$$$join', '$$url'] });
assert(mapped.test1 === 'test3url');
mapped = mezquite.get({ test2: 'test3' }, {
  test1: [
    '$$url',
    '$$$join',
    [
      'notExists',
      ['otherNotExists', 'thisOtherOneNeither'],
      'test2',
    ],
  ],
});
// iterate in array to find undefined value
assert(mapped.test1 === 'urltest3');
```

# API Documentation

## Mezquite Class ( )

Not receive any params to be instanced

## Mezquite Instance Method
### mezquite.setMethod(name,method) -> self

set a method to be available in mapped string with name: $name.

### mezquite.get(source,map)

Default value are { } for both. Should be objects instance where schema used like:
#### map:

```js
{
  key: mapString,
  [key2: mapString2]
}

```
where mapString = 'map1[.map2.map3]'
and key is used to build the object mapped.

# Interpretation 

    $method => Function(currectlyNestedPath)
    $$constant => replaceWithConstant
    $$$operator => Function(first, second, array, instance)
