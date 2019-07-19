// 参考文章：https://www.jianshu.com/p/b4f0425b22a1

function Promise(fn) {
  var _this = this;
  this.status = "pending";  // 状态 pending、fulfilled、rejected，then或catch注册的回调函数在status为pending时push到resolveCallback或rejectedCallback等待执行，在status为fulfilled或rejected时立即执行
  this.data = null;
  this.resolveCallback = [];
  this.rejectedCallback = [];
  function resolve(value) {
    setTimeout(function () {  // 解决then方法注册回调之前，resolve已执行的问题
      if (_this.status === "pending") {
        _this.status = "fulfilled";
        _this.data = value;
        _this.resolveCallback.forEach(function (callback) {
          callback(value);
        })
      }
    }, 0)
  }

  function reject(value) {
    setTimeout(function () {
      if (_this.status === "pending") {
        _this.status = "rejected";
        _this.data = value;
        _this.rejectedCallback.forEach(function (callback) {
          callback(value);
        })
      }
    }, 0)
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onResovled, onRejected) {
  onResovled = typeof onResovled === "function" ? onResovled : function (value) { return value; };
  onRejected = typeof onRejected === "function" ? onRejected : function (value) { return value; };
  if (this.status === "pending") {
    resolveCallback.push(onResovled);
    rejectedCallback.push(onRejected);
    return this;
  }
  if (this.status === "fulfilled") {
    onResovled(this.data);
    return this; // 支持then方法链式调用
  }
  if (this.status === "rejected") {
    onRejected(this.data);
  }
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}