#### 语法：Object.defineProperty(obj, prop, descriptor)

#### 参数：obj 要在其上定义属性的对象
####       prop 要定义或修改的属性的名称
####       descriptor 将被定义或修改的属性描述符

#### 该方法允许精确添加或修改对象的属性
#### 属性描述符（描述符必须是两种形式之一，不能同时是两种）：
##### 1、数据描述符（是一个具有值的属性，该值可能是可写的，也可能不是可写的）
######    value
######    writable 当为true时 value才能被改变
##### 2、存取描述符（getter setter）
######  get
######  set
######  同时具有：
######      configurable  当为true时，该属性描述符才能够被改变，默认false
######      enumerable  当为true时，才能够枚举(for in 或  Object.keys()) 默认false