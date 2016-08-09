import lodash from 'lodash'
import _ from '../../src/immutable-lodash'
import Immutable from 'immutable'
const { Map, List } = Immutable

const simpleMap = Map({a: 1, b: 1, c: 2})
const simpleList = List(['a', 'b', 'c'])

const numbersList = List([1, 2, 3])
const longNumbersList = List([1, 2, 3, 1])

const floatsList = List([2.1, 1.2, 2.3])
const falseyList = List([0, 1, false, 2, '', 3])
const pairsList = List([['a', 1], ['b', 2], ['c', 3]])

const usersList = Immutable.fromJS([
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
])
const nestedMap = Immutable.fromJS(
  { 'a': [{ 'b': { 'c': 3 } }, 4] }
)

const numbersObject = Immutable.Map({a: 1, b: 2, c: 3})
const longNumbersObject = Immutable.Map({a: 1, b: 2, c: 3, d: 1})

const _expect = (element) => {
  // Convert Immutable returns into JS objects for comparison brevities' sake
  return expect(element && element.toJS ? element.toJS() : element)
}




describe('immutableLodash', () => {

  describe('guards', () => {
    lodash.forEach(lodash.functions(_), (fun) => {
      it(fun + ' against undefined', () => {
        expect(_[fun](undefined))
      })
    })
  })

  describe('chunk function', () => {
    it('should work', () => {
      _expect(
        _.chunk(simpleList, 2)
      ).to.deep.equal(
        [['a', 'b'], ['c']]
      )
    })
    it('should work 2', () => {
      _expect(
        _.chunk(simpleList.push('d'), 2)
      ).to.deep.equal(
        [['a', 'b'], ['c', 'd']]
      )
    })
    it('should work without size', () => {
      _expect(
        _.chunk(simpleList.push('d'))
      ).to.deep.equal(
        [['a'], ['b'], ['c'], ['d']]
      )
    })
  })

  describe('compact function', () => {
    it('should work', () => {
      _expect(
        _.compact(falseyList)
      ).to.deep.equal(
        [1, 2, 3]
      )
    })
  })

  describe('concat function', () => {
    it('should work', () => {
      _expect(
        _.concat(List.of(1), List.of(2), List.of(List.of(3)))
      ).to.deep.equal(
        [1, 2, [3]]
      )
    })
  })

  describe('difference function', () => {
    it('should work', () => {
      _expect(
        _.difference(simpleList, ['b'])
      ).to.deep.equal(
        ['a', 'c']
      )
    })
  })

  describe('differenceBy function', () => {
    it('should work', () => {
      _expect(
        _.differenceBy(floatsList, [2.3, 3.4], Math.floor)
      ).to.deep.equal(
        [1.2]
      )
    })
  })

  describe('fill function', () => {
    it('should work', () => {
      _expect(
        _.fill(numbersList, '*')
      ).to.deep.equal(
        ['*', '*', '*']
      )
      _expect(
        _.fill(numbersList, '*', 1)
      ).to.deep.equal(
        [1, '*', '*']
      )
      _expect(
        _.fill(numbersList, '*', 1, 2)
      ).to.deep.equal(
        [1, '*', 3]
      )
    })
  })

  describe('intersection function', () => {
    it('should work', () => {
      _expect(
        _.intersection(List([2, 1, 3]), numbersList, List.of(1, 2))
      ).to.deep.equal(
        [2, 1]
      )
    })
  })

  describe('pullAt function', () => {
    it('should work', () => {
      // TODO: This should work with plain arg
      _expect(
        _.pullAt(numbersList, List.of(1, 2))
      ).to.deep.equal(
        [2, 3]
      )
    })
  })

  describe('sortedIndex function', () => {
    it('should work', () => {
      _expect(
        _.sortedIndex(numbersList, 2)
      ).to.deep.equal(
        1
      )
      _expect(
        _.sortedIndex(longNumbersList, undefined)
      ).to.deep.equal(
        4
      )
    })
  })

  describe('sortedIndexBy function', () => {
    it('should work', () => {
      _expect(
        _.sortedIndexBy(pairsList, ['d', 2], ([k, v]) => v)
      ).to.deep.equal(
        1
      )
      _expect(
        _.sortedIndexBy(pairsList, undefined)
      ).to.deep.equal(
        3
      )
    })
  })

  describe('union function', () => {
    it('should work', () => {
      _expect(
        _.union(List([1,2]), numbersList)
      ).to.deep.equal(
        [1, 2, 3]
      )
    })
  })

  describe('uniq function', () => {
    it('should work', () => {
      _expect(
        _.uniq(longNumbersList)
      ).to.deep.equal(
        [1, 2, 3]
      )
    })
  })

  describe('xor function', () => {
    it('should work', () => {
      _expect(
        _.xor(List([1, 2]), List([2, 3]))
      ).to.deep.equal(
        [1, 3]
      )
    })
  })

  describe('countBy function', () => {
    it('should work', () => {
      _expect(
        _.countBy(floatsList, Math.floor)
      ).to.deep.equal(
        {2: 2, 1: 1}
      )
    })
  })

  describe('groupBy function', () => {
    it('should work', () => {
      _expect(
        _.groupBy(simpleMap, (x) => x)
      ).to.deep.equal(
        {1: ['a', 'b'], 2: ['c']}
      )
    }),

    it('should work without function', () => {
      _expect(
        _.groupBy(simpleMap)
      ).to.deep.equal(
        {1: ['a', 'b'], 2: ['c']}
      )
    })
  })

  describe('keyBy function', () => {
    it('should work', () => {
      _expect(
        _.keyBy(longNumbersList, (x) => x * 2)
      ).to.deep.equal(
        {2: 1, 4: 2, 6: 3}
      )
    })
  })

  describe('orderBy function', () => {
    it('should work', () => {
      // TODO
      return
      _expect(
          _.orderBy(usersList, ['user', 'age'], ['asc', 'desc'])
        ).to.deep.equal(
          [
            { 'user': 'barney', 'age': 36 },
            { 'user': 'barney', 'age': 34 },
            { 'user': 'fred',   'age': 48 },
            { 'user': 'fred',   'age': 40 }
          ]
      )
    })
  })

  describe('partition function', () => {
    it('should work', () => {
      _expect(
        _.partition(falseyList)
      ).to.deep.equal(
        [[1, 2, 3], [0, false, '']]
      )
    })
  })

  describe('sample function', () => {
    it('should work', () => {
      _expect(
        _.sample(falseyList)
      ).to.exist
    })
  })

  describe('sampleSize function', () => {
    it('should work', () => {
      _expect(
        _.sampleSize(falseyList)
      ).to.have.length(1)
      _expect(
        _.sampleSize(falseyList, 4)
      ).to.have.length(4)
      _expect(
        _.sampleSize(falseyList, 10)
      ).to.have.length(6)
    })
  })

  describe('shuffle function', () => {
    // TODO: Mock randomness
    it('should work', () => {
      _expect(
        _.shuffle(falseyList)
      ).to.have.length(6)
    })
  })

  describe('size function', () => {
    // TODO: Mock randomness
    it('should work', () => {
      _expect(_.size(List())).to.equal(0)
      _expect(_.size(falseyList)).to.equal(6)
      _expect(_.size('')).to.equal(0)
      _expect(_.size('arst')).to.equal(4)
      _expect(_.size(Map())).to.equal(0)
      _expect(_.size(simpleMap)).to.equal(3)
    })
  })


  /*
  ** Math
  */

  /*
  ** Object
  */

  describe('at function', () => {
    it('should work', () => {
      // TODO: Do not want to coerce
      _expect(
        _.at(nestedMap, List(['a[0].b.c', 'a[1]']))
      ).to.deep.equal(
        [3, 4]
      )
    })
  })

  describe('defaults function', () => {
    it('should work', () => {
      _expect(
        _.defaults(
          Map({a: 1}), 
          Map({a: 2, b: 3}),
          Map({a: 3})
        )
      ).to.deep.equal(
        {a:1, b: 3}
      )
    })
  })

  describe('defaultsDeep function', () => {
    it('should work', () => {
      _expect(
        _.defaultsDeep(
          Immutable.fromJS({a: {a: 1}}), 
          Immutable.fromJS({a: {a: 2, b: 3}}),
          Immutable.fromJS({a: {a: 3}})
        )
      ).to.deep.equal(
        {a: {a:1, b: 3}}
      )
    })
  })

  describe('invert function', () => {
    it('should work', () => {
      _expect(_.invert(simpleMap)).to.deep.equal({1: 'b', 2: 'c'})
    })
  })

  describe('omit function', () => {
    it('should work', () => {
      _expect(
        _.omit(simpleMap, ['a'])
      ).to.deep.equal(
        {b: 1, c: 2}
      )
    })
  })

  describe('omitBy function', () => {
    it('should work', () => {
      _expect(
        _.omitBy(simpleMap, (x) => x === 'a')
      ).to.deep.equal(
        {b: 1, c: 2}
      )
    })
  })

  describe('pick function', () => {
    it('should work', () => {
      _expect(
        _.pick(simpleMap, ['a'])
      ).to.deep.equal(
        {a: 1}
      )
    })
  })

  describe('pickBy function', () => {
    it('should work', () => {
      _expect(
        _.pickBy(simpleMap, (x) => x === 'a')
      ).to.deep.equal(
        {a: 1}
      )
    })
  })


  describe('isEmpty function', () => {
    it('should work', () => {
      _expect(_.isEmpty()).to.deep.equal(true)
      _expect(_.isEmpty(List())).to.deep.equal(true)
      _expect(_.isEmpty([])).to.deep.equal(true)
    })
  })


})
