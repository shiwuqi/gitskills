var name = 'Tom';
(function() {
    if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

// Goodbay Jack

/**
 * 参考：你不知道的JavaScript（词法作用域、提升章节）
 * 解析：JavaScript在执行之前会先对其进行编译，编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来，而赋值或其他运行逻辑会留在原地。
 * 所以js引擎会先声明name，但是并没有赋值，在这name会提前声明（变量提升），在执行函数时，name已经声明，但没有赋值，所以name为undefined，结果为Goodbay Jack
 * 输入 Goodbay Tom: 1、var name = 'Jack' 改为 name = 'Jack' 2、var name = 'Jack' 改为 let name = 'Jack'
 * 类似下面的打印a的值，正常情况下，赋值 var a = 2，在编译阶段只是执行左侧的声明，var a，然后执行时再赋值，最后打印a 2
 */

a = 2;
var a;
console.log(a);

/**
 * 注意：
 * 1、函数声明会被提升，但是函数表达式不会被提升
 * 2、函数声明和变量声明都会被提升，但函数首先会被提升
 */

foo1() // 函数声明

function foo1() {
    console.log('函数声明')
}

foo2()  // TypeError: foo2 is not a function

var foo2 = function () {
    console.log('函数表达式')
}