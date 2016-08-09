# <img src='http://i.imgur.com/gd2mZi3.png'/>

A utility belt for Immutable.JS

# [Documentation](https://doda.github.io/immutable-lodash/docs/-_.html)

## Examples

```js
import _ from 'immutable-lodash'
import { Map, List } from 'immutable'

var france = Map({ 'paris': 1, 'lyon': '2', 'nantes': 3 })

_.pick(france, ['paris', 'nantes'])
// => Map { 'paris': 1, 'nantes': 3 }

_.intersection(List([2, 1]), List([2, 3]))
// => Seq [2]

_.shuffle(List([1, 2, 3, 4]))
// => List [4, 1, 3, 2]
```

## Why immutable-lodash?

Lodash (a utility belt on top of JavaScript's default collections) is the most popular npm package:


<img src='http://i.imgur.com/m15r3Z2.png'>

And so I felt Immutable.js, the most popular alternative collections library, deserved its own too!


---


Deep respect to John-David Dalton and Lee Byron for their impeccable work on lodash & immutable-js.


[![Travis build status](http://img.shields.io/travis/doda/immutable-lodash.svg?style=flat)](https://travis-ci.org/doda/immutable-lodash)
[![Dependency Status](https://david-dm.org/doda/immutable-lodash.svg)](https://david-dm.org/doda/immutable-lodash)
[![devDependency Status](https://david-dm.org/doda/immutable-lodash/dev-status.svg)](https://david-dm.org/doda/immutable-lodash#info=devDependencies)
