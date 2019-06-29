import {
  Stomp
} from './stomp.min.js'

const SOCKET_URL = ""

var stompClient = null, subscribeArr = [], client = []

var initSocket = function(data) {
  data.clientType = 'WX_NRY'
  // socket是否连接
  let socketConnected = false;
  // 待发送的消息队列
  let messageQueue = [];
  // 是否断线重连
  let reconnect = true;
  // 发送消息
  function sendSocketMessage(msg) {
    // 如果socket已连接则发送消息
    if (socketConnected) {
      wx.sendSocketMessage({
        data: msg
      })
    } else {
      // socket没有连接将消息放入队列中
      messageQueue.push(msg);
    }
  }
  // 关闭连接
  function close() {
    if (socketConnected) {
      wx.closeSocket()
      socketConnected = false;
    }
  }

  // 符合WebSocket定义的对象
  var ws = {
    send: sendSocketMessage,
    close: close
  }

  // 创建一个 WebSocket 连接
  function connect() {
    wx.connectSocket({
      url: SOCKET_URL,
      header: {
        'content-type': 'application/json',
        ...data
      },
      success: function(res) {
        console.log('socket连接成功', res)
      },
      fail: function(err) {
        console.log('socket连接失败', err)
      }
    })
  }
  connect();

  // 监听 WebSocket 连接打开事件
  wx.onSocketOpen(function (res) {
    socketConnected = true;
    ws.onopen();
    // 连接成功后，将队列中的消息发送出去
    let queueLength = messageQueue.length
    for (let i = 0; i < queueLength; i++) {
      sendSocketMessage(messageQueue.shift())
    }
  })

  // 监听 WebSocket 接受到服务器的消息事件
  wx.onSocketMessage(function (res) {
    ws.onmessage(res);
  })

  // 监听 WebSocket 错误事件
  wx.onSocketError(function (res) {
    console.log("WebSocket 错误事件")
    if (!socketConnected) {
      // 断线重连
      if (reconnect) {
        connect()
      }
    }
  })

  // 监听 WebSocket 连接关闭事件
  wx.onSocketClose(function (res) {
    console.log("WebSocket 连接关闭")
    socketConnected = false;
    // 断线重连
    if (reconnect) {
      connect();
    }
  })

  /**
   * 定期发送心跳或检测服务器心跳
   *  The heart-beating is using window.setInterval() to regularly send heart-beats and/or check server heart-beats.
   *  可看stomp.js的源码（195,207，489行），由于小程序没有window对象，所以我们要调用小程序的定时器api实现
   */
  Stomp.setInterval = function (interval, f) {
    return setInterval(f, interval);
  };
  // 结束定时器的循环调用
  Stomp.clearInterval = function (id) {
    return clearInterval(id);
  };

  stompClient = Stomp.over(ws);

  stompClient.heartbeat.outgoing = 1000
  stompClient.heartbeat.incoming = 0

  subscribeArr = []
  stompClient.connect(data, function (callback) {
    console.log('----------------->')
    // 若socket断开连接，重新连接socket并连接stomp通道
    if (subscribeArr.length !== 0) {
      subscribeArr.forEach(item => {
        stompClient.subscribe(item.url, function(res) {
          const cb = item.cb
          cb(JSON.parse(res.body))
        })
      })
    }
  })
}

// 断开socket连接
var DISCONNECT = function() {
  stompClient.disconnect(function() {
    console.log('断开连接')
  })
}

// 连接通道
var SUBSCRIBE = function (type, url, cb) {
  client[type] = stompClient.subscribe(url, function (res) {
    cb(JSON.parse(res.body))
  }, function(err) {
    console.log('err', err)
  })
  setTimeout(() => {
    subscribeArr.push({ url, cb })
  }, 0)
}

// 断开通道
var UNSUBSCRIBE = function(type, url) {
  // stompClient.unsubscribe(url, function(res) {
  //   console.log(res)
  // })
  client[type].unsubscribe()
  const keys = Object.keys(subscribeArr)
  const index = keys.indexOf(url)
  subscribeArr.splice(index, 1)
}

// 发送消息
var sendMessage = function(msg) {
  stompClient.send('/chat', {}, JSON.stringify(msg))
}

module.exports = {
  initSocket,
  SUBSCRIBE,
  sendMessage,
  UNSUBSCRIBE,
  DISCONNECT
}