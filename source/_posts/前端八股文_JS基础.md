---
title: 前端八股文——JS专题
date: 2025-10-31 10:00:00
updated: 2026-03-25 17:51:47
tags:
  - frontend
  - javascript
  - html
  - network
description: "JS基础"
categories:
  - 前端知识库
  - JavaScript
---
# JS基础

## 1.数据类型

### 1.1基本数据类型介绍，及值类型和引用类型的理解

JS中8种基础数据类型，分别为：

undefined null Boolean Number String Object Symbol BigInt

其中Symbol和BigInt是ES6新增的数据类型，可能会被单独问

Symbol代表独一无二的值，最大的用法是用来定义对象的唯一属性名

BigInt可以代表任意大小的整数

#### a.值类型的数值变动过程如下

let a=100;

let b = a;

a=200

console.log(b);//100

![image-20251030154551011](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251030154551011.png)

#### b.引用类型的赋值变动过程如下：

let a = { age:20};

let b = a;

b.age=30;

console.log(a.age)//30

![image-20251030154654912](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251030154654912.png)

### 1.2数据类型的判断（typeof/instanceof）

#### typeof

typeof:能判断所有值类型，函数，不可对null 对象 数组进行精确判断，因为都返回object

```
console.log(typeof undefined)//undefined
console.log(typeof 2)//number
console.log(typeof true)//boolean
console.log(typeof "str")//string
console.log(typeof Symbol("foo"))//symbol
console.log(typeof 2172141214n)//bigInt
console.log(typeof function(){})//function

//以下是不能判别的
console.log(typeof [])//object
console.log(typeof {})//object
console.log(typeof null)//object
```

#### instanceof

instanceof :能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。比如：

```
class People{}

class Student extends People{}

const vortesnail=new Student()

console.log(vortesnail instanceof People)//true

console.log(vortesnail instanceof Student)//true
```

其实就是顺着原型链去找，如果能找到对应的 xxx.prototype即为true,

### 1.3手写深拷贝

重点在于：判断类型（是否对象->是否特殊对象（数组））、跳出循环条件、遍历

```
//自定义的高性能遍历方法
//@param {Array | Object} collection 要遍历的集合
//@param {Function} callback 回调函数，接收(value,key/index)参数

function forEach(collection,callback){//callback执行回调函数
	if(Array.isArray(collection)){
		//数组遍历
		for (let i = 0;i<collection.length;i++){
			callback(collection[i],i)
		}
	}else {
		//对象遍历-只遍历自身属性
		for(let key in collection){
		if (collection.hasOwnProperty(key)){
			callback(collection[key],key)
		}
		}
	}
}

//深拷贝
@param {*} obj 要拷贝的值
@param {WeakMap} map 用于存储循环引用（内部使用）
@returns {*} 深拷贝后的值

//deepClone主代码
function deepClone(obj, map = new WeakMap()){
	//1.处理原视类型和函数
	if (object === null || typeof obj !== "object"){
		return obj;
	}
	
	//2.处理循环引用,跳出循环的关键
	if (map.has(obj)){
	return map.get(obj)
	}
	
	//3.处理特殊对象类型
	//Date对象
	if (obj instanceof Date){
		return new Date(obj.getTime())
	}
	
	//正则表达式
	if (obj instanceof RegExp){
		return new RegExp(obj);
	}
	
	//数组
	if (Array.isArray(obj)){
		const result = [];
		map.set(obj,result);
		
		forEach(obj,(value,index)=>{
			result[index] = deepClone(value,map);
		});
		
		return result;
	}
	
	//普通对象
	if(obj instanceof Object){
		const result = {};
		map.set(obj,result);
		
		forEach(obj,(value,key)=>{
			result[key]=deepClone(value,map);
		});
		
		return result;
	}
	
	//其他未处理的情况，直接返回(如Map Set 等)
	return obj;
	}


//此处为测试样例
const target = {
  field1: 1,
  field2: undefined,
  field3: "ConardLi",
  field4: {
    child: "child",
    child2: {
      child2: "child2"
    }
  },
  field5: [1, 2,3, 4],
}

target.field6 = target

console.log("原对象:", target);
console.log("拷贝后:", deepClone(target));
console.log("是否独立对象:", target !== deepClone(target));
console.log("嵌套对象是否独立:", target.field4 !== deepClone(target).field4);
}

```

还要考虑其他类型，比如函数（要用到 `eval` 和 `new Function`，我个人觉得这个会违反 CSP，不适合当作第三方库的处理方式）、`Symbol` 和 `Date` 等

### 1.4根据 0.1+0.2!==0.3，讲讲IEEE 754,如何使其相等？

原因总结：

进制转换：js在做数字计算的时候，0.1和0.2都会被转成二进制后无限循环，但是js采用的IEEE 754二进制浮点运算，最大可以存储53位有效数字，于是大于53位后面的回截掉，导致精度丢失

对阶运算：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移，位数位移时可能会发生数丢失的情况，影响精度

解决办法：

#### 1.转为整数（大数）运算

```
function add(a,b){
	const maxLen = Math.max(
	a.toString().split(".")[1].length,
	b.toString().split(".")[1].length
	);
	const base = 10 ** maxLen;
	const bigA = BigInt(base * a)
	const bigB = BigInt(base * b)
	const bigRes = (bigA + bigB) / BigInt(base);
	return Number(bigRes)
}
```

#### 2.使用Number.EPSILON误差范围

```
function isEqual(a,b){
	return Math.abs(a - b) < Number.EPSILON;
}
console.log(isEqual(0.1+0.2,0.3))//true
```

#### 3.转为字符串，对字符串做加法运算

```
//字符串数字相加
var addStrings=function(num1,num2){
	//定义递归计数器
	let i = num1.length -1;
	let j = num2.length -1;
	//接收结果
	const res = [];
	//进位情况carry
	let carry = 0;
	while (i >= 0 || j>=0 ){
		const n1 = i >= 0 ? Number(num1[i]) : 0;
		const n2 = j >= 0 ? Number(num2[j]) : 0;
		//当前位+上一位的进位
		const sum = n1 + n2 + carry;
		//取个位数作为当前位的结果
		res.unshift(sum % 10);
		//计算新的进位
		carry = Math.floor(sum / 10);
		i--;
		j--;
	}
	if(carry){
		res.unshift(carry);//最后还有进位要加上一位
	}
	return res.join("");
};

function isEqual(a,b,sum){
	const [intStr1,deciStr1] = a.toString().split(".");//分开整数和小数
	const [intStr2,deciStr2] = b.toString().split(".");//分开整数和小数
	const inteSum = addStrings(intStr1,intStr2);//获取整数相加部分
	const deciSum = addStrings(deciStr1,deciStr2);//获取小数相加部分
	return inteSum + "." + deciSum === String(sum);
}

console.log(isEqual(0.1,0.2,0.3))//true


```

示例：计算 "58" + "67"

text

```
初始：carry = 0

第一次循环（个位）：
  n1 = 8, n2 = 7
  sum = 8 + 7 + 0 = 15
  res.unshift(15 % 10) → res = [5]
  carry = Math.floor(15 / 10) = 1

第二次循环（十位）：
  n1 = 5, n2 = 6
  sum = 5 + 6 + 1 = 12
  res.unshift(12 % 10) → res = [2, 5]
  carry = Math.floor(12 / 10) = 1

循环结束：
  carry = 1 → res.unshift(1) → res = [1, 2, 5]

结果："125"
```

## 2.原型和原型链

function Foo(){}

let f1= new Foo();

let f2=new Foo();

![image-20251101181220318](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251101181220318.png)

总结：

原型：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型“继承”属性，其实就是prototype对象。

原型链：由相互关联的原型组成的链式结构就是原型链

先说出总结的话，再举例子说明如何顺着原型链找到某个属性。

推荐的阅读：[JavaScript 深入之从原型到原型链](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2Fblog%2Fissues%2F2) 掌握基本概念，再阅读这篇文章[轻松理解 JS 原型原型链](https://juejin.cn/post/6844903989088092174)加深上图的印象。

## 3.作用域与作用域链

作用域：规定如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）

作用域链：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没有找到，则放弃寻找。这种层级关系就是作用域链。（由多个执行上下文的变量对象构成的链表就叫做作用域链）

需要注意的是，js采用的是静态作用域，所以函数的作用域在函数定义时就确定了。

推荐阅读：先阅读[JavaScript 深入之词法作用域和动态作用域](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F3)，再阅读[深入理解 JavaScript 作用域和作用域链](https://juejin.cn/post/6844903797135769614)

## 4.执行上下文

这部分一定要按顺序连续读这几篇文章，必须多读几遍：

- [JavaScript 深入之执行上下文栈](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F4)；
- [JavaScript 深入之变量对象](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F5)；
- [JavaScript 深入之作用域链](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F6)；
- [JavaScript 深入之执行上下文](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F8)。

总结：当JavaScript代码执行一段可执行代码时，会创建对应的执行上下文。对于每个执行上下文，都有三个重要属性：

变量对象（Variable object,VO）

作用域链（Scope chain）

this(关于this指向问题，在上面推荐的深入系列也有讲从ES规范开始讲的。可以参考这篇文章读懂：[JavaScript 的 this 原理](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2018%2F06%2Fjavascript-this.html))

## 5.闭包

根据MDN中文的定义，闭包的定义如下：

在JavaScript中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域。

闭包是指那些能够访问自由变量的函数。自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。闭包=函数+函数能够访问的自由变量

在经过上一小节“执行上下文”的学习，再来阅读这篇文章：[JavaScript 深入之闭包](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F9)，你会对闭包的实质有一定的了解：

在某个内部函数的执行上下文创建时，会将父级函数的活动对象加到内部函数的[[scope]]中，形成作用域链，所以即使父级函数的执行上下文销毁（即执行上下文栈弹出父级函数的执行上下文），但是因为其活动对象还是实际存储在内存中可被内部函数访问到的，所以实现闭包。

闭包应用：函数作为参数被传递：

```
function print(fn){
	const a =200;
	fn();
}

//全局变量
const a=100;

function fn(){
	console.log(a);
}
print(fn);//100
```

**函数会记住它被创建时的词法环境**

函数作为返回值被返回：

```
function create(){
	const a = 100;
	
	return function(){
		console.log(a);
	};
}

const fn = create();
const a = 200;
fn();//100
```

闭包：自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方。

应用实例：比如缓存工具、隐藏数据、只提供API

```
function createCache(){
	const data = {};//闭包中被隐藏的数据，不被外界访问
	return {
	set:function(key,val){
		data[key]=val;
	},
	get:function(key){
		return data[key];
		},
	};
}

const c = createCache();
c.set("a",100)
console.log(c.get("a"));//100

```

## 6.call apply bind实现

### call

call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法

```
var obj = {
	value:"vortesnail",
};

function fn(){
	console.log(this.value);
}
fn.call(obj);//vortesnail
```

通过call方法我们做到了以下两点：

call改变了this的指向，指向到了obj

fn函数执行了

若我们自己写call方法，可以先改造obj

```
var obj={
	value:"vortesnail",
	fn:function(){
		console.log(this.value);
	},
};
obj.fn();//vortesnail
```

这时候this就指向了obj，但是这样我们就手动给obj增加了一个fn属性，我们可以执行完再使用对象属性的删除方法就可以了

```
obj.fn = fn;
obj.fn();
delete obj.fn;
```

根据这个思路，我们可以写出来

```
Function.prototype.mycall = function(context){
	//判断调用对象
	if(typeof this !== "function"){
		throw new Error("Type error");
	}
	//首先获取参数
	let args = [...arguments].slice(1);
	let result = mull;
	//判断context是否传入，如果没有传就设置为window
	context = context || window;
	//将被调用的方法设置为context的属性
	//this即为我们要调用的方法
	context.fn =this
	//执行要被调用的方法
	result = context.fn(...args);
	//删除手动增加的属性方法
	delete context.fn;
	//将执行结果返回
	return result;
}
```

### apply

```
Function.prototype.myApply = function(context){
	if(typeof this !== "function"){
		throw new Error("Type error");
	}
	let result = null;
	context = context || window;
	//与上面代码相比，我们使用Symbol来保证属性唯一
	//也就是保证不会重写用户自己原来定义在context中的同名属性
	const fnSymbol = Symbol();
	context[fnSymbol]=this;
	//执行要被调用的方法
	if(arguments[1]){
		result=context[fnSymbol](...arguments[1]);
	} else {
		result=context[fnSymbol]();
	}
	delete context[fnSymbol];
	return result;
};
```

### bind

bind返回的是一个函数，这个地方可以详细阅读[解析 bind 原理，并手写 bind 实现](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FsisterAn%2FJavaScript-Algorithms%2Fissues%2F81)

```
Function.prototype.myBind=function(context){
	//判断调用对象是否为函数
	if(typeof this!=="function"){
		throw new Error("Type error");
	}
	//获取参数
	const args=[...arguments].slice[1],
	const fn = this;
	return function Fn(){
		return fn.apply(
			this instanceof Fn ? this : context,
			//当前这个arguments是指Fn的参数
			args.concat(...arguments)
			);
	};
};
```

## 7.new实现(自定义new操作符实现详解)

1.首先创建一个新的空对象

2.根据原型链，设置空对象的 _proto_  为构建函数的prototype

3.构建函数的this指向这个对象，执行构建函数的代码（为这个新对象添加属性）

4.判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象

```
function _new(constructor,..args){
	//1.参数验证：确保第一个参数是一个构建函数
	if(typeof constructor !== 'function'){
		throw new Error('constructor must be a function')
	}
	//2.创建新对象并设置原型链：
	//创建一个新对象，这个新对象的_proto_指向构造函数的prototype，这样就建立了原型链关系
	//实现原型继承和构造函数调用
	//Object.create():创建一个新对象，将这个新对象的[[Prototype]]指向指定的原型对象
	const obj = Object.create(constructor.prototype)
	//constructor.apply():调用一个函数，将函数的this值设定为指定的对象，以数组形式传递参数
	const res = constructor.apply(obj,args)
	//4.判断构造函数返回值的类型:处理构造函数的返回值
	//如果构造函数返回对象或函数，就返回这个返回值，否则返回新创建的对象obj
	//细节：1.res!==null 排除null，因为typeof null === 'object'这个历史遗留问题
	const isObject = typeof res === 'object' && res !== null
	const isFunction = typeof res === 'function'
	
	return isObject || isFunction ? res : obj
}
function Person(age){
	this.age =age
	this.name='vortesnail'
}
const person = _new(Person,28)
console.log(person)
```

详细细节可以看下这篇文章：[# 谈谈JS中new的原理与实现](https://juejin.cn/post/6994000994300330021)

## 8.异步

着重理解Promise/async await/event loop

### 8.1 event loop 宏任务和微任务

首先推荐一个可以在线看代码流程的网站：[loupe](https://link.juejin.cn/?target=http%3A%2F%2Flatentflip.com%2Floupe%2F%3Fcode%3DJC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)。 然后看下这个视频学习下：[到底什么是 Event Loop 呢？](https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1oV411k7XY%2F%3Fspm_id_from%3D333.788.recommend_more_video.-1)

Web APIs 会创建对应的线程，比如 `setTimeout` 会创建定时器线程，`ajax` 请求会创建 http 线程。。。这是由 js 的运行环境决定的，比如浏览器。

看完上面的视频之后，至少大家画 Event Loop 的图讲解不是啥问题了，但是涉及到**宏任务**和**微任务**，我们还得拜读一下这篇文章：[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872)。如果意犹未尽，不如再读下这篇非常详细带有大量动图的文章：[做一些动图，学习一下 EventLoop](https://juejin.cn/post/6969028296893792286#comment)。想了解事件循环和页面渲染之间关系的又可以再阅读这篇文章：[深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678)。

注意：1.Call Stack 调用栈空间 -> 2.尝试DOM渲染 -> 3.触发Event loop

每次Call Stack清空，即每次轮询结束，即同步任务执行完

都是DOM重新渲染的机会，DOM结构有改变则重新渲染

然后再去触发下一次Event loop

宏任务：setTimeout/setInterval/Ajax/DOM事件

微任务：Promise async/await

两者区别：

宏任务：DOM渲染后触发，如setTimeout/setInterval/DOM事件/script

微任务：DOM渲染前触发，如Promise.then/MutationObserver/Node环境下的process.nextTick



从event loop解释，为何微任务执行更早？

微任务是ES6语法规定的（被压入micro task queue）

宏任务是由浏览器规定的（通过Web APIs压入Callback queue）

宏任务执行事件一般比较长

每一次宏任务开始之前一定是伴随着一次event loop结束的，而微任务是在一次evnet loop结束前执行的



### 8.2 Promise

实现一次Promise A+ 规范，要知道原理

关于 Promise 的所有使用方式，可参照这篇文章：[ECMAScript 6 入门 - Promise 对象](https://link.juejin.cn?target=https%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fpromise)。 手写 Promise 源码的解析文章，可阅读此篇文章：[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-0)。 关于 Promise 的面试题，可参考这篇文章：[要就来 45 道 Promise 面试题一次爽到底](https://juejin.cn/post/6844904077537574919)。

实现一个Promise.all

```
Promise.all = function(promises){
	return new Promise((resolve,reject)=>{
	//参数可以不是数组
	})
}
```

### 8.3 async/await 和 Promise的关系

async/await是消灭异步回调的终极武器

但和Promise并不互斥，反而相辅相成

执行async函数，返回的一定是Promise对象

await相当于Promise的then

tru...catch可捕获异常，代替了Promise的catch

9 浏览器的垃圾回收机制

这里看这篇文章即可：[「硬核 JS」你真的了解垃圾回收机制吗](https://juejin.cn/post/6981588276356317214)。

有两种垃圾回收策略：

标记清除：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁

引用计数：它把对象是否不再需要简化定义为对象有么有其他对象引用到它，如果没有引用指向该对象（引用计数为0），对象将被垃圾回收机制回收。

标记清除的缺点：

内存碎片化，空间内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。

分配速度慢，因为即便时使用First-fit策略，其操作仍是一个O(n)的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。

解决以上的缺点可以使用标记整理算法，标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存。（如下图）

![image-20251103171213944](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251103171213944.png)

引用计数的缺点：

需要一个计数器，占用内存空间大，因为我们也不知道被引用数量的上限

解决不了循环引用导致的无法回收问题

V8的垃圾回收机制也是基于标记清除算法，不过对其进行了一些优化

针对新生区采用并行回收

针对老生区采用增量标记与惰性回收

10.实现一个EventMitter类

EventMitter就是发布订阅模式的典型应用：（好长）

```
class EventEmitter<T extends Record<string | symbol, any>> {
  private eventsMap: Record<keyof T, Array<(...args: any[]) => any>>

  constructor() {
    this.eventsMap = Object.create(null)
  }

  // 触发事件
  emit<K extends keyof T>(evt: K, ...args: Parameters<T[K]>) {
    if (!this.eventsMap[evt]) {
      console.warn('warn: The event not register')
      return false
    }

    const listeners = [...this.eventsMap[evt]]
    listeners.forEach((listener) => {
      listener(...args)
    })

    return true
  }

  // 添加对应事件的监听函数
  on<K extends keyof T>(evt: K, cb: T[K]) {
    if (typeof cb !== 'function') {
      throw new TypeError('The evet-triggered callback must be a function')
    }

    if (!this.eventsMap[evt]) {
      this.eventsMap[evt] = [cb]
    } else {
      this.eventsMap[evt].push(cb)
    }
    return this
  }

  // 添加一次对应事件的监听函数
  once<K extends keyof T>(evt: K, cb: T[K]) {
    if (typeof cb !== 'function') {
      throw new TypeError('The evet-triggered callback must be a function')
    }

    const tempCb: any = (...args: Parameters<T[K]>) => {
      cb(...args)
      this.off(evt, tempCb)
    }

    this.on(evt, tempCb)
  }

  // 清除监听事件
  off<K extends keyof T>(evt: K, cb?: T[K]) {
    if (!this.eventsMap[evt]) {
      console.warn('warn: The event not register')
      return
    }

    // 未传入要删除的对应回调函数，就删除注册的事件下所有监听回调函数
    if (!cb) {
      this.eventsMap[evt].length = 0
      return
    }

    if (typeof cb !== 'function') {
      throw new TypeError('The evet-triggered callback must be a function')
    }

    const cbs = this.eventsMap[evt]
    const len = cbs.length
    for (let i = 0; i < len; i++) {
      if (cbs[i] === cb) {
        this.eventsMap[evt].splice(i, 1)
        break
      }
    }
  }
}

// 测试上述 EventEmiiter 类
interface Events {
  add: (name: string) => void
  del: (name: string) => void
  clear: () => void
}

let people: Array<string> = []
const ee = new EventEmitter<Events>()

ee.on('add', (name) => {
  people.push(name)
})

ee.on('del', (name) => {
  people = people.filter((v) => v !== name)
})

ee.once('clear', () => {
  people = []
})

ee.emit('add', 'vortesnail')
ee.emit('add', 'kaisei')
ee.emit('add', 'hcyang')
console.log(people) // ['vortesnail', 'kaisei', 'hcyang']

ee.emit('del', 'kaisei')
console.log(people) // ['vortesnail', 'hcyang']

// 取消了该事件
ee.off('add')
ee.emit('add', 'kaisei')
console.log(people) // ['vortesnail', 'hcyang']

ee.emit('clear')
console.log(people) // []

// 重新添加 add 事件
ee.on('add', (name) => {
  people.push(name)
})
ee.emit('add', 'vortesnail')
ee.emit('clear') // 该事件已经无法触发
console.log(people) // ['vortesnail']
```

JavaScript中var let const 的区别

var：函数作用域，初始化为undefined，变量

let:块级作用域，变量

const:块级作用域，常量

var在全局作用域里面可以访问得到，但是let和const就访问不到

let const这两个属于块级作用域的，在ES6里面新提出，就这个属性可以避免变量污染。最佳实践的建议是默认使用const，需要重新赋值的时候使用let，尽量少用var