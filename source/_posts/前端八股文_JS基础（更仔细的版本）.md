---
title: "前端八股文_JS基础（更仔细的版本）"
date: 2025-11-25 14:46:08
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - javascript
  - network
  - json
description: "请简述JavaScript中的this"
categories:
  - 前端知识库
  - JavaScript
---
请简述JavaScript中的this

答：this是一个关键字，在函数被调用的时候动态绑定，指向当前执行上下文中的“调用者”或“所属对象”。

1.new绑定：最高优先级，当函数通过new关键字调用时，this指向新创建的实例对象。

2.显式绑定：call apply bind来绑定：这三个方法都可以显示this指向。

apply方法接收两个参数：一个是this绑定的对象，一个是参数数组。

call方法：接收的第一个是this绑定的对象，后面的其余参数是传入函数执行的参数。

bind方法：传入一个对象，返回一个this绑定了传入对象的新函数。这个函数的this执行那个除了使用new的时候会改变其他都不会改变。

3.隐式绑定：对象方法调用。当函数作为对象的方法被调用时，this指向该对象。

4.默认绑定：最低优先级，非严格模式下this指向全局对象，浏览器中是window，Node.js中是global。严格模式下this是 undefined

箭头函数没有自己的this。



AMD/CommonJS/ESM

JavaScript模块化规范的问题。

早期的JS没有模块化，所有的代码都在全局作用域，导致命名冲突、依赖混乱、无法按需加载、难以维护。

AMD(Asynchronous Module Definition)浏览器友好的规范

为浏览器环境设计的（网络加载慢的时候，需要异步的时候）
异步加载，不阻塞页面渲染，适合浏览器，所有的依赖都在define数组中提前声明。

```
//定义模块
define(['./dependency'],function(dep){
	return{
		name:'Bob',
		greet:()=>dep.hello()
	};
});

//使用模块
require(['./myModule'],function(myMod){
	myMod.greet();
});
```

个人感觉这个方法很复杂且麻烦。

CommonJS

是同步的模块化，由Node.js采用推广的。同步加载，适合服务器端

运行的时候才会解析依赖，第一次require后会缓存，后续直接返回缓存，主要用于Node.js。

```
//导出
module.exports = {name:'Alice'};
//或
exports.sayHi = () => console.log('Hi');
```

ES6 Moudules (ESM)

优势：静态分析，编译时确定依赖，同时支持同步/异步操作。import是静态的，import()是动态的。浏览器原生支持，Node.js支持。

```
//ESM导出
export const name = 'Charlie';
export default function(){}
//ESM导入
import func,{name} from './module.js';
```

关于ESM和CommonJS的异同

CommonJS是动态加载的（运行时），依赖关系在代码执行的时候才确定，ESM是静态的（编译时）。依赖关系在代码解析的阶段就确定了。

CommonJS是同步的，ESM是同步异步都支持，import静态，import()动态

CommonJS导出的是值的副本（拷贝），ESM导出的是只读绑定（活引用）

```
//CommonJS
//counter.js
let count = 0;
const inc = () => count++;
module.exports = {count,inc};

//main.js
const {count,inc} = require('./counter.js')
inc();
console.log(count);//0 因为在解析的时候已经拷贝好了值
```

```
//ESM
//counter.mjs
export let count = 0;
export const inc = ()=> {count++};

//main.mjs
import {count,inc} from './counter.mjs';
inc();
console.log(count)//1
```

this的指向：CommonJS模块内this===module.exports，ESM的模块顶层 this===undefined

.mjs = 强制使用ES6模块语法(import/export)

.js=默认使用CommonJS(require/module.exports)

Node.js中的模块识别规则

1.通过文件拓展名：.mjs强制ESM，.cjs强制CommonJS，.js看package.json

2.通过package.json

```
{
	"type":"module" //所有.js视为ESM
	"type":"commonjs"//默认的
}
```

let const var的区别

new操作符的实现原理

原型和原型链

JS里面很多的语法糖，都是基于原型继承的，目标就是让对象可以共享方法和属性，避免重复创建

比如所有的数组都有push\map方法，但是不需要每个数组都存一个函数代码。

1.每个函数都有prototype的属性

只有函数(Function)才有prototype

它是一个普通对象，默认包含一个constructor，这个constructor指向这个函数自己。

```
function Person(name){
	this.name = name;
}
console.log(Person.prototype);//{constuctor:Person}
```

![image-20251123174638319](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251123174638319.png)

所有的构造函数都是Function的实例，所有的原型对象都是Object的实例，除了Object.prototype，它的原型是null

在JavaScript中使用构造函数来新建一个对象的时候，每一个构造函数都有一个prototype原型对象，这个对象包含了可以由这个构造函数的所有实例共享的属性和方法。

这些实例可以通过‘_proto_’来访问到这个构造函数的原型对象。

原型链是什么？原型链就是当你在查找一个属性的时候，js引擎先会从该实例对象里寻找这个属性，如果没有，就向上查找它的构造函数的原型对象的属性，如果原型对象的属性还没有，就继续往上寻找。最后的尽头都会汇聚到Object.prototype，如果在Object.Prototype里面还没有，就会返回null。所以这就是为什么所有新建的对象都可以使用toString()，因为到最后都是返回到Object.prototype。

**对执行上下文的理解**

执行上下文其实是JS引擎的机制。是对代码执行的环境抽象，每当JS引擎运行一段代码都会创建一个对应的执行上下文。

其实就是一个盒子，里面装着当前作用域里的变量、函数声明、this的指向、外层作用域的引用（用于形成作用域链）

**1.执行上下文类型**

(1)全局执行上下文

任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象。一个程序中只有一个全局执行上下文。

(2)函数执行上下文

当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文呢可以有任意个。

(3)eval 函数执行上下文

执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用。

![image-20251125142547496](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251125142547496.png)

**3.创建执行上下文的生命周期：两个阶段**

**创建阶段(Creation Phase)**

1.确定this的值

全局上下文：this=window(非严格模式)或undefined(严格模式)

函数上下文：由调用方式决定（见this规则）

2.创建词法环境

环境记录：存储变量、函数声明、形参等等。

在函数中：记录arguments、形参、var/function声明

对外部词法环境的引用：用于构建作用域链

3.创建变量环境

实际上在现代JS引擎中，词法环境约等于变量环境

主要适用于存储var声明的变量（let/const 存在暂时性死区）

**执行阶段(Execution Phase)**

引擎逐行执行代码、给变量赋值、执行函数调用、解析表达式

**执行上下文栈**

当JS执行代码时，首先遇到全局代码，会创建一个全局执行上下文并压入执行栈中，每当遇到一个函数调用就为该函数创建一个新的执行上下文并压入栈顶。

引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有代码执行完毕则弹出全局执行上下文。

```
let a = 'Hello World';
function first(){
	console.log('Inside first function');
	second();
	console.log('Again inside first function');
}
function second(){
	console.log('Inside second function');
}
```

简单来说执行上下文就是指：在执行一点JS代码之前，需要先解析代码。解析的时候会创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都先拿出来，变量先赋值为undefined，函数先声明好可以使用。这一步执行完，才开始正式执行程序。

在一个函数执行之前，也会创建一个函数执行上下文的环境，跟全局执行上下文类似，不过函数执行上下文会多出this/arguments和函数参数

全局上下文：变量定义、函数声明

函数上下文：变量定义、函数声明、this、arguments

**==和===的区别？**

==是类型转换后比较（抽象相等）

===严格相等，类型和值都必须相同

```
0==false;//true

0===false;//false
```

**null和undefined的区别？**

undefined:变量已经声明，但是没有赋值，函数没有返回值默认返回undefined

null:表示空值或有意absence of value，是对象类型的特殊值。

判断一个变量是数组的原因

```
Array.isArray(arr);//最可靠的方式
//或者
Object.prototype.toString.call(arr)==='[object Array]'
```

事件冒泡vs事件捕获？

事件捕获：从外向内捕获的(document -> 目标元素)

事件冒泡：从内向外（目标元素->document）

原型和原型链？

每个函数都有prototype属性（对象）。

每个对象都有_proto_指向其构造函数的prototype

当访问对象属性时，如果自身没有，则沿着_proto_上面查找，知道Object.prototype。如果Object.prototype还没有的话那就返回null

this属性的绑定规则：

1.new绑定：this指向新创建的对象

2.显式绑定:call/apply/bind

3.隐式绑定:obj.fn()，这个时候，指向这个调用函数的对象

4.默认绑定：非严格模式下为window，严格模式下就是undefined。

5.箭头函数：继承外层的this，他没有this属性

宏任务 微任务

宏任务：setTimeout setInterval I/O UI渲染

微任务：Promise.then/catch/finally/queueMicrotask/MutationObserver

执行顺序：当前宏任务->所有微任务->渲染->下一个宏任务

Event Loop

浏览器/Node.js中协调JS单线程与异步操作的机制：

执行全局的脚本

执行所有的微任务/渲染UI（浏览器）/取下一个宏任务，重复

防抖vs节流

防抖debounce:n秒内只执行最后一次

```
function debounce(fn,delay){
	let timer;
	return (...args){
		clearTimeout(timer);
		timer = setTimeout(()=>fn.apply(this,args),delay)
	}
}
const test = function(){
	console.log('1')
}
debounce(test,500)

```

节流throttle:n秒内最多只执行一次

```
function throttle(fn,delay){
	let last = Date.now();
	return (...args)=>{
		const now = Date.now();
		if(now -last > delay){
			last = now;
			fn.apply(this,args);
		}
	}
}
const test = function(){
	console.log('1')
}
throttle(test,500)
```

