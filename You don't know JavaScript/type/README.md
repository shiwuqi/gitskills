### JavaScript常用的原生类型
 * String()
 * Number()
 * Boolean()
 * Array()
 * Object()
 * Function()
 * RegExp()
 * Date()
 * Error()
 * Symbol()

### 判断类型
 1、typeof
  ```javascript
  typeof 1 // number
  typeof '' // string
  typeof true // boolean
  typeof [] // object
  typeof {} // object
  typeof undefined // undefined
  typeof null // object
  typeof function(){} // function
  typeof Symbol(1) // symbol
  ```
  ```javascript
  var aa = 42;
  typeof aa // number
  aa = true // boolean
  ```
  ##### 在对变量执行typeof操作时，得到的结果并不是该变量的类型，而是该变量的值的类型，JavaScript中的变量没有类型
 2、instanceof
  ##### instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
  ```javascript
  function Foo() {}
  function Bar() {}
  var foo = new Foo()
  foo instanceof Foo // true
  foo instanceof Bar() // false
  foo instanceof Object // true
  {} instanceof Object // 报语法错误，{}是空对象也是空的代码块，js无法识别
  ```
 3、Object.prototype.toString.call()
  ```javascript
  Object.prototype.toString.call(1) // [object Number]
  Object.prototype.toString.call('') // [object String]
  Object.prototype.toString.call(true) // [object Boolean]
  Object.prototype.toString.call([]) // [object Array]
  Object.prototype.toString.call({}) // [object Object]
  Object.prototype.toString.call(undefined) // [object Undefined]
  Object.prototype.toString.call(null) // [object Null]
  Object.prototype.toString.call(function(){}) // [object Function]
  Object.prototype.toString.call(Symbol(1)) // [object Symbol]
  ```

