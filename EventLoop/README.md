## Event Loop
---

```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0)

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
})

console.log('script end');

// script start --> script end --> promise1 --> promise2 --> setTimeout
```

### 任务队列

##### 宏任务  
* script代码块、setTimeout、setInterval、I/O、UI交互事件、setImmediate（nodejs环境）

##### 微任务
* Promise、MutaionOberver、process.nextTick（nodejs环境）

#### 注释：  
##### 1、微任务优先级高于宏任务  
##### 2、Promise优先级高于async

#### 参考文章[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)


           

