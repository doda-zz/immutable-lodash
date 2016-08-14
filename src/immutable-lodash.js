import Immutable from 'immutable'
// TODO: Do not import entire lodash
import lodash from 'lodash'
const { Map, List, Set, OrderedSet, Repeat, Seq, Iterable } = Immutable

const identity = (x) => x

const not = (fun) => {
  return (...args) => !fun(...args)
}

const truthy = (x) => {
  if (x) {
    return true
  }
}

const splitPath = (path) => {
  return lodash.filter(path.split(/[\[\]\.]+/))
}

const MAX_LIST_LENGTH = 4294967295
const MAX_LIST_INDEX = MAX_LIST_LENGTH - 1


/**
 * Creates an iterable of elements split into groups the length of `size`.
 * If `iterable` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Iterable} Returns the new iterable of chunks.
 * @example
 *
 * let list = ['a', 'b', 'c', 'd']
 * _.chunk(list, 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(list, 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(iterable, size=1) {
  let current = 0
  if (_.isEmpty(iterable)) {
    return iterable
  }
  let result = List()
  while (current < iterable.size) {
    result = result.push(iterable.slice(current, current + size))
    current += size
  }
  return result
}


/**
 * Creates an iterable with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to compact.
 * @param {Iterable} Returns the new iterable of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
function compact(iterable) {
  return iterable.filter(truthy)
}


/**
 * Creates an Iterable of the same type concatenating `iterable`
 * with any additional iterables and/or values.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @param {Iterable} Returns the new concatenated sequence.
 * @example
 *
 * _.concat(['a'], 2, [3], [[4]])
 * // => ['a', 2, 3, [4]]
 */
function concat(...args) {
  let [first, ...other] = args
  return first.concat(...other)
}


/**
 * Creates an Iterable of `iterable` values not included in the other given iterables
 * The order of result values is determined by the order they occur
 * in the first iterable.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to inspect.
 * @param {...Iterable} [values] The values to exclude.
 * @returns {Iterable} Returns the iterable of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3])
 * // => [1]
 */
function difference(iterable, values) {
  const valueSet = Set(values)
  return iterable.filterNot((x) => valueSet.has(x))
}


/**
 * This method is like `_.difference` except that it accepts `iteratee` which
 * is invoked for each element of `iterable` and `values` to generate the criterion
 * by which they're compared. Result values are chosen from the first iterable.
 * The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to inspect.
 * @param {...Iterable} [values] The values to exclude.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Iterable} Returns the new iterable of filtered values.
 * @example
 *
 * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [1.2]
 */
 function differenceBy(iterable, values, iteratee) {
  if (!iterable) return iterable
  const valueSet = Set(values.map(iteratee))
  return iterable.filterNot((x) => valueSet.has(iteratee(x)))
}


/**
 * Fills elements of `iterable` with `value` from `start` up to, but not
 * including, `end`.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to fill.
 * @param {*} value The value to fill `iterable` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=iterable.size] The end position.
 * @returns {Iterable} Returns `iterable`.
 * @example
 *
 * let list = [1, 2, 3]
 *
 * _.fill(list, 'a')
 * // => ['a', 'a', 'a']
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3)
 * // => [4, '*', '*', 10]
 */
function fill(iterable, value, start=0, end=iterable.size) {
  let num = end - start
  return iterable.splice(start, num, ...Repeat(value, num))
}


/**
 * Returns a sequence of unique values that are included in all given iterables
 * The order of result values is determined by the order they occur in the first iterable.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {...Iterable} [iterables] The iterables to inspect.
 * @returns {Iterable} Returns the new iterable of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3])
 * // => Seq [2]
 */
function intersection(...iterables) {
  if (_.isEmpty(iterables)) return OrderedSet()
  let result = OrderedSet(iterables[0])

  for (let iterable of iterables.slice(1)) {
    result = result.intersect(iterable)
  }
  return result.toSeq()
}


/**
 * Removes elements from `iterable` corresponding to `indexes` and returns an
 * iterable of removed elements.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Iterable} Returns the new iterable of removed elements.
 * @example
 *
 * let iterable = ['a', 'b', 'c', 'd']
 * _.pullAt(iterable, [1, 3])
 * // => ['b', 'd']
 */
function pullAt(iterable, indexes) {
  return indexes.map((x) => iterable.get(x))
}


function baseSortedIndexBy(iterable, value, iteratee, retHighest) {
  value = iteratee(value)

  let setLow
  let low = 0
  let high = iterable ? iterable.size : 0
  const valIsNaN = value !== value
  const valIsNull = value === null
  const valIsUndefined = value === undefined

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    const computed = iteratee(iterable.get(mid))
    const othIsDefined = computed !== undefined
    const othIsNull = computed === null
    const othIsReflexive = computed === computed

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    } else if (othIsNull) {
      setLow = false
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value)
    }
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return Math.min(high, MAX_LIST_INDEX)
}


/**
 * Determines the lowest index at which `value`
 * should be inserted into `iterable` in order to maintain its sort order.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The sorted iterable to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `iterable`.
 * @example
 *
 * _.sortedIndex([30, 50], 40)
 * // => 1
 */
function sortedIndex(iterable, value) {
  // TODO: Use binary search for numbers
  return baseSortedIndexBy(iterable, value, identity)
}


/**
 * This method is like `_.sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `iterable` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The sorted iterable to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `iterable`.
 * @example
 *
 * let maps = [{ 'x': 4 }, { 'x': 5 }]
 *
 * _.sortedIndexBy(maps, { 'x': 4 }, (o) => o.x)
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedIndexBy(maps, { 'x': 4 }, 'x')
 * // => 0
 */
function sortedIndexBy(iterable, value, iteratee=identity) {
  return baseSortedIndexBy(iterable, value, iteratee)
}


/**
 * Creates an iterable of unique values, in order, from all given iterables.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {...Iterable} [iterables] The iterables to inspect.
 * @returns {Seq} Returns the new iterable of combined values.
 * @example
 *
 * _.union([2], [1, 2])
 * // => Seq [2, 1]
 */
function union(...iterables) {
  return OrderedSet(Seq(iterables).flatten(true)).toSeq()
}


 /**
  * Creates a duplicate-free sequence of the iterable, in which only the first
  * occurrence of each element is kept.
  *
  * @static
  * @memberOf _
  * @category Iterable
  * @param {Iterable} iterable The iterable to inspect.
  * @returns {Seq} Returns the new duplicate free sequence.
  * @example
  *
  * _.uniq([2, 1, 2])
  * // => Seq [2, 1]
  */
 function uniq(iterable) {
   return OrderedSet(iterable).toSeq()
 }


/**
 * Creates a sequence of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given iterables. The order of result values is determined by the order
 * they occur in the iterables.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {...Iterable} [iterables] The iterables to inspect.
 * @returns {Seq} Returns the sequence of filtered values.
 * @see _.difference
 * @example
 *
 * _.xor([2, 1], [2, 3])
 * // => [1, 3]
 */
function xor(...iterables) {
  // TODO: Return original type
  let [first, ...others] = iterables
  return Set().union(...iterables).subtract(Set(first).intersect(...others)).toSeq()
}


/**
 * Creates a Map composed of keys generated from the results of running
 * each element of `iterable` through `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Function} [iteratee=_.identity]
 *  The iteratee to transform keys.
 * @example
 *
 * _.countBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': 1, '6': 2 }
 */
function countBy(iterable, iteratee=identity) {
  let result = Map()
  for (let value of iterable) {
    result = result.update(iteratee(value), 0, (x) => x + 1)
  }
  return result
}


/**
 * Creates a map composed of keys generated from the results of running
 * each element of `iterable` through `iteratee`. The order of grouped values
 * is determined by the order they occur in `iterable`. The corresponding
 * value of each key is a List of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Iterable} iterable The iterable to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee to transform keys.
 * @returns {Map} Returns the composed aggregate map.
 * @example
 *
 * _.groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
function groupBy(iterable, iteratee=identity) {
  // TODO: How does looped reassignment like this behave in terms of memory usage?
  let result = Map()
  for (let entry of iterable.entrySeq()) {
    let [key, value] = entry
    const keyed = iteratee(value)
    const collector = result.get(keyed, List()).push(key)
    result = result.set(keyed, collector)
  }
  return result
}


/**
 * Creates a Map composed of keys generated from the results of running
 * each element of `iterable` through `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Iterable} iterable The iterable to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee to transform keys.
 * @returns {Map} Returns the composed aggregate map.
 * @example
 *
 * let keys = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ]
 *
 * _.keyBy(keys, (o) => String.fromCharCode(o.code))
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.keyBy(keys, 'dir')
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 */
function keyBy(iterable, iteratee=identity) {
  let result = Map()
  for (let value of iterable) {
    result = result.set(iteratee(value), value)
  }
  return result
}


/**
 * Creates a list of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Iterable} iterable The iterable to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {List} Returns the list of grouped elements.
 * @example
 *
 * let users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ]
 *
 * _.partition(users, (o) => o.active)
 * // => objects for [['fred'], ['barney', 'pebbles']]
 *
 */
function partition(iterable, predicate=identity) {
  let truths = List(), falsehoods = List()
  for (let value of iterable) {
    if (predicate(value)) {
      truths = truths.push(value)
    } else {
      falsehoods = falsehoods.push(value)
    }
  }
  return List.of(truths, falsehoods)
}


/**
 * Gets a random element from `iterable`.
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Iterable} iterable The iterable to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4])
 * // => 2
 */
function sample(iterable) {
  let index = lodash.random(0, iterable.size - 1)
  return iterable.get(index)
}

/**
 * Gets `n` random elements at unique keys from `iterable` up to the
 * size of `iterable`.
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Iterable} iterable The iterable to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @returns {List} Returns the random elements.
 * @example
 *
 * _.sampleSize([1, 2, 3], 2)
 * // => List [3, 1]
 *
 * _.sampleSize([1, 2, 3], 4)
 * // => List [2, 3, 1]
 */
function sampleSize(iterable, n=1) {
  let index = -1
  let result = List(iterable)
  const length = result.size
  const lastIndex = length - 1

  while (++index < n) {
    const rand = lodash.random(index, lastIndex)
    const value = result.get(rand)

    result = result.set(rand, result.get(index))
    result = result.set(index, value)
  }

  return result.slice(0, Math.min(length, n))
}

/**
 * Creates an iterable of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @category iterable
 * @param {Iterable} iterable The iterable to shuffle.
 * @returns {Iterable} Returns the new shuffled iterable.
 * @example
 *
 * _.shuffle([1, 2, 3, 4])
 * // => [4, 1, 3, 2]
 */
function shuffle(iterable) {
  let indexes = lodash.shuffle(lodash.range(iterable.size))
  return _.pullAt(iterable, List(indexes))
}


function size(iterable) {
  return Iterable.isIterable(iterable) ? iterable.size : lodash.size(iterable)
}


/**
 * Creates an array of values corresponding to `paths` of `iterable`.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to iterate over.
 * @param {...(string|string[])} [paths] The property paths of elements to pick.
 * @returns {Iterable} Returns the picked values.
 * @example
 *
 * let iterable = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * _.at(iterable, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 */
function at(map, paths) {
  return paths.map((path) => {
    return map.getIn(splitPath(path))
  })
}


/**
 * Creates new iterable with all properties of source iterables that resolve
 * to `undefined`. Source iterables are applied from left to right.
 * Once a key is set, additional values of the same key are ignored.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The destination iterable.
 * @param {...Iterable} [sources] The source iterables.
 * @returns {Iterable} Returns `iterable`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
 * // => { 'a': 1, 'b': 2 }
 */
function defaults(map, ...sources) {
  return map.mergeWith((prev, next) => {
    return prev === undefined ? next : prev
  }, ...sources)
}


/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The destination iterable.
 * @param {...Iterable} [sources] The source iterables.
 * @returns {Iterable} Returns `iterable`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
function defaultsDeep(map, ...sources) {
  return map.mergeDeepWith((prev, next) => {
    return prev === undefined ? next : prev
  }, ...sources)
}


/**
 * Creates an iterable composed of the inverted keys and values of `iterable`.
 * If `iterable` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The iterable to invert.
 * @returns {Iterable} Returns the new inverted iterable.
 * @example
 *
 * let iterable = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * _.invert(iterable)
 * // => { '1': 'c', '2': 'b' }
 */
function invert(map) {
  return map.mapEntries((entry) => lodash.reverse(entry))
}


function baseOmitBy(map, predicate, omit=true) {
  let keyPredicate = (entry) => predicate(entry[0])
  let entries = map.entrySeq()
  let filtera = omit ? entries.filterNot(keyPredicate) : entries.filter(keyPredicate)
  return filtera.fromEntrySeq()
}


/**
 * The opposite of `_.pick` this method creates a new iterable omitting the
 * supplied keys
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The source iterable.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Iterable} Returns the new iterable.
 * @example
 *
 * let map = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * _.omit(map, ['a', 'c'])
 * // => { 'b': '2' }
 */
function omit(map, props) {
  props = Set(props)
  return _.omitBy(map, (key) => {
    return props.has(key)
  })
}


/**
 * The opposite of `_.pick` this method creates a new iterable omitting the
 * supplied keys `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The source iterable.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Iterable} Returns the new iterable.
 * @example
 *
 * let iterable = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * _.omitBy(iterable, _.isNumber)
 * // => { 'b': '2' }
 */
function omitBy(map, predicate=identity) {
  return baseOmitBy(map, predicate, true)
}


/**
 * Creates an iterable composed of the picked `iterable` properties.
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The source iterable.
 * @param {...(string|string[])} [props] The property identifiers to pick.
 * @returns {Iterable} Returns the new iterable.
 * @example
 *
 * let iterable = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * _.pick(iterable, ['a', 'c'])
 * // => { 'a': 1, 'c': 3 }
 */
function pick(map, props) {
  props = Set(props)
  return _.pickBy(map, (key) => {
    return props.has(key)
  })
}


/**
 * Creates an iterable composed of the `iterable` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @category Iterable
 * @param {Iterable} iterable The source iterable.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Iterable} Returns the new iterable.
 * @example
 *
 * let iterable = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * _.pickBy(iterable, _.isNumber)
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(map, predicate=identity) {
  return baseOmitBy(map, predicate, false)
}


function isEmpty(iterable) {
  return !iterable || iterable.length === 0 || iterable.size === 0
}

function noop() {}

/**
 * The object containing all `immutable-lodash` functions.
 * @example
 *
 * // Important note for examples:
 * 
 * // Rather than specifying every example data structure like so:
 *
 * let map = List([Map({ 'a': 1 }), Map({ 'b': 2 }), Map({ 'c': 3 }) ])
 *
 * // Immutable Lists and Maps are implied:
 *
 * let map = [ { 'a': 1 }, { 'b': 2 }, { 'c': 3 } ]
 *
 * // This is to make the it easier for you to see what every function is actually doing.
 * 
 * // As a rule, `immutable-lodash` functions try to return the type of object that was passed in, or,
 * // where it makes more sense, a lazy `Seq`. The docs specify a "Returns:" type for every function,
 * // which you can see below.
 * 
 * @namespace
*/
const _  = {}

_.chunk = chunk
_.compact = compact
_.concat = concat
_.difference = difference
_.differenceBy = differenceBy
_.fill = fill
_.intersection = intersection
_.pullAt = pullAt
_.sortedIndex = sortedIndex
_.sortedIndexBy = sortedIndexBy
_.union = union
_.uniq = uniq
_.xor = xor
_.countBy = countBy
_.groupBy = groupBy
_.keyBy = keyBy
_.partition = partition
_.sample = sample
_.sampleSize = sampleSize
_.shuffle = shuffle
_.size = size
_.at = at
_.defaults = defaults
_.defaultsDeep = defaultsDeep
_.invert = invert
_.omit = omit
_.omitBy = omitBy
_.pick = pick
_.pickBy = pickBy

_.isEmpty = isEmpty
_.noop = noop

const iterableFunctions = lodash.pull(
  lodash.functions(_),
  'some', 'size', 'isEmpty', 'noop'
)

// Guard against empty-ish first arguments
lodash.forEach(iterableFunctions, (fun) => {
  const func = _[fun]
  _[fun] = (first, ...args) => {
    if (_.isEmpty(first)) {
      return first
    }
    return func(first, ...args)
  }
})


export default _
