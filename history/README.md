## Window.history是一个只读属性，主要是保存浏览历史

### 属性：

#### length 返回浏览器历史列表中的URL数量

### 方法：

#### 1、back()
##### 向后跳转 history.back()
#### 2、forward()
##### 向前跳转 history.forward()
#### 3、go()
##### 跳转到history中指定的一个点
##### history.go(-1) 等同于 history.back()
##### history.go(1) 等同于 history.forward()
##### history.go(0) 等同于刷新当前页面
#### 4、pushState()   h5新添加方法，通常与window.onpopstate 配合使用
##### history.pushState(state, title, url) 接受三个参数 1、state 状态对象 popstate事件触发时，该对象会传入回调函数。不需要可以为null 2、title 新页面的标题（目前被忽略） 3、新的历史URL记录 新URL必须与当前URL同源，否则pushState()会抛出异常。新URL不必须为绝对路径，若是相对路径，那么它将被作为相对于当前URL处理。该参数可选，缺省为当前URL
##### var state = { foo: 'bar' }
##### history.pushState(state, null, 'page.html')
##### 上面例子调用pushState()后浏览器并不会立即加载该URL，但是浏览器地址栏立刻会显示/page.html，甚至不会检查/page.html是否存在，它只是成为浏览历史中的最新记录
#### 5、replaceState()  h5新添加方法，通常与window.onpopstate 配合使用
##### history.replaceState(state, title, url) 和history.pushState()非常相似，区别在于replaceState()是修改了当前的历史记录项而不是修改新建一个。注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项
##### var stateObj = { foo: 'bar' }
##### history.pushState(stateObj, null, 'bar.html')
##### history.replaceState(stateObj, null, 'bar2.html')
##### 假设开始是/foo.html页面，上面例子会导致地址栏显示/bar2.html，但是浏览器不会去加载/bar2.html，甚至都不需要检查bar2.html是否存在。假设现在跳转到https://wwww.baidu.com，history.back()，这里，地址栏会显示/bar2.html，再次history.back()，地址栏会显示/foo.html，完全跳过了bar.html


