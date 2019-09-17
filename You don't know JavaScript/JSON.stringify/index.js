JSON.stringify(42) // '42'
JSON.stringify('42') // '42'
JSON.stringify(null) // 'null'
JSON.stringify(true) // 'true'

// JSON.stringify()在对象中遇到undefined、function和symbol时会自动将其忽略，在数组中则会返回null
JSON.stringify(undefined) // undefined
JSON.stringify(function(){}) // undefined
JSON.stringify([1, undefined, function(){}, 4]) // "[1, null, null, 4]"
JSON.stringify({a: 2, b: function(){}}) // "{"a" : 2}"

// 若对象中定义了toJSON()，JSON字符串化时会首选调用该方法，然后用它的返回值来进行序列化
var bb = {
  val: [1, 2, 3],
  toJSON: function() {
    return this.val.slice(1);
  }
}

JSON.stringify(bb) // "[2,3]"

// 可选参数replacer，可以是数组或函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除
var aa = {
  b: 42,
  c: '42',
  d: [1, 2, 3]
}

JSON.stringify(aa, ['b', 'c']) // "{"b": 42, "c": "42"}"
JSON.stringify(aa, function(k, v) { // "{"b": 42, "d": [1, 2, 3]}"
  if (k !== "c") return v;
})

// 另一个可选参数space，用来指定输出的缩进格式
var cc = {
  b: 42,
  c: '42',
  d: [1, 2, 3]
}

JSON.stringify(cc, null, 3)
// "{
//   "b": 42,
//   "c": "42",
//   "d": [
//      1,
//      2,
//      3
//   ]
// }"