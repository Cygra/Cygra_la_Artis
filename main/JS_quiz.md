https://leftstick.github.io/js-interview-online/#/exam1

```javascript
/**
 *  要求，尝试完成如下功能：
 *
 *  isString('hello')              = true
 *  isString(123)                  = false
 *  isString(undefined)            = false
 *  isString(null)                 = false
 *  isString(new String('hello'))  = true
 *
 **/
function isString(value) {
  //在这里实现
  return (
    value instanceof String 
    || typeof value === 'string'
  );
}
```
```javascript
assert(isString('hello'), '原始string类型校验失败')
assert.equal(isString(12445), false, '原始数值类型校验失败')
assert.equal(isString(undefined), false, '未初始化变量校验失败')
assert.equal(isString(null), false, '空值校验失败')
assert(isString(new String('hello')), '字符串对象校验失败')
assert.equal(isString({ name: 'aaa' }), false, '字面量类型校验失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  const currying = require('currying')
 *
 *  const add = function(a, b) {
 *    return a + b
 *  }
 *
 *  const curried = currying(add)
 *  console.log(curried(1)(2)) // 3
 *
 **/
function currying(func) {
  //在这里实现
  return function(...args) {
    if (args.length < func.length){
      return function(...args2) {
        return currying(func)(...args, ...args2)
      }
    } else {
      return func(...args)
    }
  }
}
```
```javascript
const add = currying(function(a, b) {
  return a + b;
})
assert.equal(add(1)(2), 3, '一次柯里化验证失败')
// ------------
const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1, 2)(3), 6, '多参数一次柯里化验证失败')
// ------------
const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1)(2)(3), 6, '多参数多次柯里化验证失败')
// ------------
const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1)(2)(3), 6, '多参数多次柯里化验证失败');
assert.equal(add(2)(3)(4), 9, '多参数多次柯里化状态分离验证失败')
// ------------
const add = currying(function(a, b, c, d) {
  return a + b + c + d;
})
const a11 = add(1)
assert.equal(a11(2)(3)(4), 10, '多参数多次柯里化验证失败')
assert.equal(a11(2, 3, 4), 10, '多参数多次柯里化复用验证失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  输入： array，例如: [1, 2, 3, 4]
 *
 *  输出：一个重复后的array，例如：[1, 2, 3 , 4, 1, 2, 3 ,4]
 *
 **/
function duplicate(array) {
  //在这里实现
  return array.concat(array)
}
```
```javascript
const arr = [8, 2, 16, 90]
const compareArr = [8, 2, 16, 90, 8, 2, 16, 90]
assert.deepEqual(duplicate(arr), compareArr, '基本测试失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  map([1, 2], function(i) {
 *   return i * 2
 *  })
 *  要求输出： [2, 4]
 *
 *  map([{name: 'nanfeng', age: 25}, {name: 'beifang', age: 33}], function(i) {
 *   return i.age
 *  })
 *  要求输出： [25, 33]
 *
 *  map([5, 7], function(i) {
 *   return this + i
 *  }, 2)
 *  要求输出： [7, 9]
 *
 **/
function map(arr, func, ctx) {
  //在这里实现
  let result = []
  arr.forEach(function(i) {
    result.push(func.call(ctx, i))
  })
  return result
}
```
```javascript
const NativeMap = Array.prototype.map
  let calledNativeMap = false
Array.prototype.map = function() {
  calledNativeMap = true
  return NativeMap.apply(this, arguments)
}

map(['x'], function(x) {
  return x;
})
assert.equal(calledNativeMap, false, '不能使用原生的map方法')
// ------------
const test = [1, 2, 3]
const actual = map(test, function(i) {
    return i + 1
})
assert.deepEqual(actual, [2, 3, 4], '基本测试用例失败')
// ------------
const test = [
  {
      city: 'Shanghai',
      population: 25000000
  },
  {
      city: 'Beijing',
      population: 30000000
  }
];
const actual = map(test, function(i) {
  return i.population / this
}, 10)
assert.deepEqual(actual, [2500000, 3000000], '上下文环境测试失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  const what = 'The fuck!';
 *
 *  value(what) === 'The fuck!'
 *
 *  const hello = function() {
 *      return 'world'
 *  }
 *
 * value(hello) === 'world'
 *
 **/
function value(anything) {
  //在这里实现
  if(anything instanceof Function) {
    return value(anything());
  } else {
    return anything;
  }
}

```
```javascript
assert.equal(value(2), 2, '简单数值验证失败')
// ------------
const fn = function() {
  return 3
}
assert.equal(value(fn), 3, '简单方法验证失败')
// ------------
const fn = function() {
  return function() {
      return 'Hello';
  };
};
assert.equal(value(fn), 'Hello', '嵌套方法验证失败')
// ------------
const fn = function() {
  return function() {
    return function() {
      return function() {
        return function() {
          return [1, 2];
        };
      };
    };
  };
};
assert.deepEqual(value(fn), [1, 2], '多层嵌套验证失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  console.log(camelcase('HELLO WORLD')) // helloWorld
 *
 *  console.log(camelcase('HELLO         WORLD')) // helloWorld
 *
 *  console.log(camelcase('drunkman')) // drunkman
 *
 *  console.log(camelcase('hi----you')) // hiYou
 *
 **/
function camelcase(str) {
  //在这里实现
  var arr = str.toLowerCase().split('');
  var result = arr.map(function(i, ind){
    return ind === 0 
      ? i 
      : [' ', '-'].includes(arr[ind - 1])
        ? i.toUpperCase() 
        : i;
  })
  return result.filter(function(i) {
    return ![' ', '-'].includes(i)
  }).join('')
}
```
```javascript
assert.equal(camelcase('helloworld'), 'helloworld', '基本测试失败')
assert.equal(camelcase('hello world'), 'helloWorld', '单空格测试失败')
assert.equal(camelcase('HELLO WORLD'), 'helloWorld', '单空格全大写测试失败')
assert.equal(camelcase('how are you'), 'howAreYou', '单空格多单词测试失败')
assert.equal(camelcase('how   are   you'), 'howAreYou', '多空格测试失败')
assert.equal(camelcase('what-the-fuck'), 'whatTheFuck', '横杠做分隔符测试失败')
assert.equal(camelcase('i  will-miss this----exam'), 'iWillMissThisExam', '混合测试失败')
```
---
```javascript

/**
 *
 *  尝试完成如下功能：
 *
 *  const say = function(name, words, callback){
 *    setTimeout(function(){
 *      callback({ status: 'FINISHED' })
 *    })
 *  }
 *
 *  const thunkSay = thunkify(say);
 *
 *  thunkSay('ZhangSan', 'You are freak.')(function(err, data){
 *    console.log(err)  // undefined
 *    console.log(data) // { status: 'FINISHED' }
 *  })
 *
 **/
function thunkify(func) {
  //在这里实现
}
```
```javascript
const read = function(file, fn) {
  fn(null, 'file: ' + file);
}
const thunkRead = thunkify(read)

thunkRead('hello.txt')(function(err, res) {
  assert(!err)
  assert('file: hello.txt' === res)
  done()
})
// ------------
const read = function(file, fn) {
setTimeout(function() {
  fn(null, 'file: ' + file)
}, 2000)
}

const thunkRead = thunkify(read);

thunkRead('world.txt')(function(err, res) {
  assert(!err)
  assert('file: world.txt' === res)
  done()
})
// ------------
const load = function(fn) {
    fn(null, this.name)
};

const user = {name: 'nanfeng', load: thunkify(load)}

user.load()(function(err, name) {
  if (err) {
    return done(err)
  }
  assert('nanfeng' === name)
  done()
})
// ------------
const load = function(fn) {
    throw new Error('wow!!!')
};

const thunkLoad = thunkify(load)

thunkLoad()(function(err) {
  assert(err)
  assert('wow!!!' == err.message)
  done()
})
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  times(1, String) // ['0']
 *
 *  times(3, Boolean) // [false, true, true]
 *
 *  times(4, function(i) { return 'Fuck.' + i; }) // ['Fuck.0', 'Fuck.1', 'Fuck.2', 'Fuck.3']
 *
 **/
function times(n, func) {
  //在这里实现
  let result = [];
  for (var i = 0; i < n; i ++) {
    result.push(func(i))
  }
  return result;
}
```
```javascript
assert.deepEqual(times(2, String), [ '0', '1' ], '基本测试失败')
assert.deepEqual(times(3, Boolean), [ false, true, true ], 'Boolean值测试测试失败')
assert.deepEqual(times(5, function() {
  return 'Hi';
}), [ 'Hi', 'Hi', 'Hi', 'Hi', 'Hi' ], '不使用index测试失败')
assert.deepEqual(times(3, function(i) {
  return 'Hi-' + i;
}), [ 'Hi-0', 'Hi-1', 'Hi-2' ], '使用index测试失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 * const app = new DI()
 *
 * app.register('duck', {
 *   fly() {
 *     return 'fuck flying'
 *   }
 * })
 *
 * app.run(['duck', function(duck){
 *   console.log(duck.fly()) //fuck flying
 * }])
 *
 **/
class DI {

  register(name, instance) {
    // 这里实现
    this[name] = instance;
  }

  run(arr) {
    // 这里实现
    var name = arr[0];
    this[name]();
  }
}
```
```javascript
const app = new DI()

app.register('duck', {
  fly() {
    return 'fuck flying'
  }
});

app.run(['duck', function(duck) {
  assert.equal(duck.fly(), 'fuck flying', '字面量注入测试失败')
  done()
}])
// ------------
const app = new DI();

app.register('woman', function() {
    this.cry = function() {
        return 'crying wawawa!'
    }
})

app.run(['woman', function(woman) {
    assert.equal(woman.cry(), 'crying wawawa!', '类注入测试失败')
    done()
}])
// ------------
const app = new DI();

app.register('people', function() {
  this.yell = function() {
      return 'don\'t go'
  }
})

app.register('puppy', function() {
  this.bark = function() {
      return 'wow'
  }
})

app.run(['puppy', 'people', function(puppy, people) {
  assert.equal(puppy.bark(), 'wow', '多实例puppy注入测试失败')
  assert.equal(people.yell(), 'don\'t go', '多实例people注入测试失败')
  done()
}])
// ------------
const app = new DI();

app.register('puppy', function() {
  this.bark = function() {
    return 'wow'
  }
})

assert.throws(function() {
  app.run(['man', function(man) {}])
}, Error, '不存在实例测试失败')
```
---
```javascript
/**
 *
 *  要求，尝试完成如下功能：
 *
 *  const src = [3, 6, 9]
 *  const target = [1, 6, 8]
 *
 *  const diff = difference(src, target)
 *
 *  console.log(diff) // [3, 9]
 *
 **/
function difference(src, target) {
  //在这里实现
  let result = [];
  src.forEach(function(i) {
    if (!target.includes(i)) result.push(i)
  })
  return result;
}
```
```javascript
const src = ['nan', 'feng', 'hao']
const target = ['aa', 'xiao', 'hao']

assert.deepEqual(difference(src, target), ['nan', 'feng'], '基本测试失败')
// ------------
const src = [1, NaN, 3]
const target = [NaN, 5, NaN]

assert.deepEqual(difference(src, target), [1, 3], 'NaN匹配测试失败')
// ------------
const src = [1, NaN, 3];
const target = [5, 'k'];

assert.equal(difference(src, target).toString(), '1,NaN,3', 'NaN2匹配测试失败')
```
