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
#### 5、replaceState()  h5新添加方法，通常与window.onpopstate 配合使用
#####

