'use strict';
const assert = require('assert');
const parse = require('../../app/parse-referenced-prop');
describe('test to parse referenced', () => {
    it('should reference to other property', () => {
        const res = parse({
            a: 1,
            b: { __$ref: 'a' }
        });
        assert(res.b === res.a);
    });

    it('should reference to mixed properties', () => {
        const res = parse({
            a: 1,
            b: { __$ref: 'c' },
            c: { __$ref: 'a' }
        });
        assert(res.b === res.a);
        assert(res.c === res.a);
    });

    it('should reference by reference', () => {
        const res = parse({
            a: {},
            b: { __$ref: 'c' },
            c: { __$ref: 'a' }
        });
        assert(res.b === res.a);
        assert(res.c === res.a);
    });

    it('should return undefined if reference does not exists', () => {
        const res = parse({
            a: {},
            b: { __$ref: 'reference.to.other.not.exists' }
        });
        assert(res.b === undefined);
    });

    it('should reference to other property', () => {
        const res = parse({
            a: {},
            b: {
                bb: {
                    __$ref: 'c'
                }
            },
            c: {
                cc: {
                    __$ref: 'a'
                }
            }
        });
        assert(res.b.bb.cc === res.a);
        assert(res.c.cc === res.a);
    });

    it('should reference to other property', () => {
        const res = parse({
            a: {},
            b: {
                bb: {
                    __$ref: 'c'
                }
            },
            c: {
                cc: {
                    __$refHere: 'here'
                },
                here: 'hereIAm'
            }
        });
        assert(res.b.bb.cc === 'hereIAm');
        assert(res.c.cc === 'hereIAm');
    });
});
