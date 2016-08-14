# <img src='http://i.imgur.com/gd2mZi3.png'/>

> A utility belt for [Immutable.JS](https://facebook.github.io/immutable-js/)

## See the [documentation](https://doda.github.io/immutable-lodash/docs/).

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

[Lodash](https://lodash.com/) (a utility belt on top of JavaScript's default collections) is the most popular npm package:


<img src='http://i.imgur.com/m15r3Z2.png'>

And so I felt Immutable.js, the most popular alternative collections library, deserved its own too!


---


Major credits to [John-David Dalton](https://github.com/jdalton) and [Lee Byron](https://github.com/leebyron), and all contributors for their impeccable work on [lodash](https://lodash.com/) & [Immutable.JS](https://facebook.github.io/immutable-js/). Both are incredible pieces of art & API design that I was able to learn a lot from.


[![Travis build status](http://img.shields.io/travis/doda/immutable-lodash.svg?style=flat)](https://travis-ci.org/doda/immutable-lodash)
[![Dependency Status](https://david-dm.org/doda/immutable-lodash.svg)](https://david-dm.org/doda/immutable-lodash)
[![devDependency Status](https://david-dm.org/doda/immutable-lodash/dev-status.svg)](https://david-dm.org/doda/immutable-lodash#info=devDependencies)
