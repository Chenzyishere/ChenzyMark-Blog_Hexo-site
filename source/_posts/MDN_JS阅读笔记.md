---
title: "MDN_JS概览阅读笔记"
date: 2026-04-09 21:00:00
updated: 2026-04-09 21:00:00
tags:
  - frontend
  -	JavaScript
  - Develop
description: ""
categories:
  - 前端知识库
  - JavaScript
---
*MDN上对JavaScript的介绍相当充分，本文档记录快速阅读JavaScript语言概览后记下来的知识点。*

# 数据类型：（原始类型/对象）

## 原始类型：

Number:表示除了非常大的整数之外的所有数值（整数和浮点数）

BigInt:表示任意大整数

String:用于存储文本

Boolean：true和false--通常用于条件逻辑

Symbol:用于创建唯一的、不会冲突的标识符

Undefined:变量还未被赋值

Null:故意的空值

​	快速记忆：可以分为五类：数字类有Number\BigInt，文本类有String，空值/未定义有Null/Undefined，唯一值有Symbol，判断值有Symbol（其实感觉也不太好记，其实多用就完事了）

## 对象类型：

Function：函数

Array：数组

Date:时间

RegExp:正则表达式

Error:错误

重点要关注的有Function/Array/RegExp

关于类型的还有很多详细的知识，比如说数值中的NaN，Infinity，字符串转为数值parseInt()等知识点。先快速跳过

# 变量

在JavaScript中使用三个关键字之一来声明变量：let/const/var

- let:块级变量。声明的变量仅在包围变量的块中可用（块级作用域）
- const:声明值永远不能改变的变量。变量仅在声明变量的块中可用。（块级作用域）。

> *用const声明的变量不能重新被赋值。如果变量是对象的话，它们不会阻止修改变量的值。为什么？因为const其实保存的是内存地址。修改的其实是地址里面的值，没有影响。
>
> MDN原文的表述：如果你声明了一个变量，但没有给变量赋值，那么它的值是 `undefined`。你声明 `const` 变量时不能不初始化，因为你后面无论如何都无法修改它。
>
> 用 `let` 和 `const` 声明的变量仍然会占据定义所在的整个作用域，在实际的声明行之前的区域称作[暂时性死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#暂时性死区)。它与变量遮蔽有一些有趣的、不会在其他语言中发生的交互。

- var:全局变量。在JavaScript中非常不推荐使用，会导致变量污染。

# 运算符

## 数值运算符

JavaScript的数值运算符：+、-、*、\、%（取余）和**(指数运算)。使用=赋值。每个二元运算符还有复合赋值运算符，+=和-=。

自增是++。自减是--。可以用作前缀或后缀运算符。

> +运算符也可以执行字符串拼接。
>
> 如果字符串和Number或其他值相加，都会将其转换为字符串。
>
> 将空字符串和某个值相加，是将该值转换为字符串的实用方法。

## 比较

JavaScript使用<、>、<=和>=，它们可以处理字符串和数字。对于相等，如果接收到不同类型的操作数，==运算符会执行类型转换，===运算符不尝试类型转换。

```
123 == "123"; // true
1 == true; // true

123 === "123"; // false,不接受类型转换，number!=string
1 === true; // false，不接受类型转换，number!=boolean
```

双等号也有不相等的版本：!=和！==

## 逻辑运算符

JavaScript中，逻辑运算符不仅处理布尔值，还处理值的真假。

```
const a = 0 && "Hello"; // 0，因为 0 是“假值”
const b = "Hello" || "world"; // "Hello"，因为 "Hello" 和 "world" 都是“真值”
```

&&和||运算符使用短路逻辑，是否执行第二个操作数取决于第一个操作数。对于访问对象的属性之前检查是否是null对象很有用：

```
const name = o && o.getName();//先检查o对象是否有值，有值再获取名字
```

用于缓存值

```
const name = cachedName || (cachedName = getName());
```

# 语法

## 控制结构

### if/else

条件语句使用if/else

JavaScript没有elif，else if实际只是由单个if语句构成的else分支

JavaScript有while和do...while循环。前者是基础循环，后者是用于你希望确保循环体至少执行一遍的循环

### for

JavaScript的for循环是与C和Java的一样，在单行中为循环提供控制信息

JavaScript中两个著名循环：for...of（其对可迭代对象进行迭代，特别是数组）和for...in(其访问对象的全部可枚举属性)

（说起来有点绕，其实意思就是of是循环对象里面的值，in就是循环对象里面的全部属性）

```
for (const value of array) {
  // 使用值
}

for (const property in object) {
  // 使用对象属性
}
```

### switch

```
switch (action) {
  case "draw":
    drawIt();
    break;
  case "eat":
    eatIt();
    break;
  default:
    doNothing();
}
```

其实就是与C一个样，如果不添加break就会落到下一级。

### try...catch

使用try...catch处理JavaScript错误。

使用throw语句抛出错误，许多内置的运算也可以抛出错误。

你无法确定刚才捕获的错误的类型，因为throw语句可以抛出任何值。然而，可以假设它是Error实例，有一些内置的Error子类（TypeError和RangeError）就可以用他们来确定是什么错误类型。

如果只想要处理一种错误类型，然后需要捕获所有错误，利用instanceof识别错误类型，然后重新抛出其他错误类型。

```
try {
  buildMySite("./website");
} catch (e) {
  if (e instanceof RangeError) {
    console.error("看起来参数超出了范围：", e);
    console.log("重试...");
    buildMySite("./website");
  } else {
    // 不知道如何处理其他的错误类型；抛出它们这样调用栈靠上的代码可能捕获以及处理它
    throw e;
  }
}
```

# 对象

可以将JavaScript对象当作是键值对的集合。它们类似于：

python中的字典、C和C++的散列表、Java中的HashMap、PHP中的关联数组

JavaScript对象是散列（什么是散列？）。与静态类型语言中的对象不同，JavaScript中的对象没有固定得形状，可以随时添加、删除、重新排序、修改或动态查询属性。对象键总是字符串或symbol，即使是通常被认为是整数的数组索引，但在底层实际上是字符串。

通常使用字面量语法创建对象：

```
const obj = {
	name:"胡萝卜",
	for:"麦克斯",
	details:{
		colors:"橙色",
		size:"12",
	}
}
```

可以使用点号.或方括号[]访问对象属性。当使用点记号时，键必须是合法的标识符。

```
//.的访问方法
obj.name="西蒙";
const name = obj.name;

//[]的访问方法
obj["name"]="西蒙";
const name = obj["name"];

//变量定义键
const userName =prompt("你的键是什么？");
obj[userName] = prompt("键的值是什么？");
```

链式访问：

```
obj.details.color;//橙色
obj["details"]["size"];//12
```

> 个人认为，用方括号来表示，会觉得是二维数组，不太直观。

对象总是引用，所以除非显式地复制对象，否则改变对象将会对外部可见。

```
const obj = {};
function doSomething(o) {
  o.x = 1;
}
doSomething(obj);
console.log(obj.x); // 1
```

说人话，就是你可以打印出来你更改对象后的值。

对象这里，最重要的其实是继承与原型链。开一个新的帖子来讲。

# 数组

JavaScript中的数组其实是特殊的对象类型。数组也是对象中的一种。用法跟对象非常像。数组有一个length属性，这个属性比最大索引大1。

通常用数组字面量创建数组（我也不太懂什么是字面量，反正都这么叫）

```
const a = ["dog","cat","cock"];
a.length;//3
```

JavaScript数组是对象中的一种，所以我们可以用对待对象的方式使用它。

1.可以给他们赋任意的属性，包括数字索引。唯一不同的地方就是设定索引后会更新length

```
const a = ["dog","cat","cock"];
a[100]="fox";
console.log(a.length);//101
console.log(a);//["dog","cat",empty*97,"cock"]

```

这样的数组我们会称为稀疏数组，因为中间的空槽，导致引擎将数组负优化为散列表。所以要确保数组紧密排列。

越界索引不会抛出异常，只会返回undefined。

```
const a = ["dog","cat","cock"];
console.log(typeof a[90]);//undefined
```

数组元素的类型是任意的，数组大小可以任意变大或变小。

```
const arr = [1,"foo",true];
arr.push({})
//arr=[1,"foo",true,{}]
```

可以用for循环数组

```
for(let i=0;i<a.length;i++){
	console.log(a[i]);
}
```

当然，我们也可以使用for...of循环，其实就是循环数组里的值

```
for(const currentValue of arr){
	console.log(currentValue);
}
```

数组还有很多数组方法。另开一个帖子详细说。例如map()、push()、pull()之类的东西。

# 函数

## 基础函数声明

```
function add(x,y){
	const total = x + y;
	return total;
}
```

JavaScript函数可以接受0个或多个参数。函数体可以包含任意数量的语句。

return语句可以在任何时候返回一个值，用于终止函数。

如果没有return ,那JavaScript会返回undefined。

函数被调用时参数可以比函数规定的要少或多。如果调用函数时，没有传递它期待的参数，那么这些参数就会设为undefined。如果传递的参数比函数期待的多，函数会忽略额外的参数。

```
add();//NaN
//等价于add(undefined,undefined)

add(2,3,4);//5
//使用前两个参数，忽略参数4
```

## 参数语法

还有其他可用的参数语法，例如剩余参数语法(...args)。

- ### 剩余参数语法

```
function avg(...args){
	let sum = 0;
	for(const item of args){
		sum += item;
	}
	return sum / args.length;
}
avg(2,3,4,5);//3.5
//这里使用...args,把所有传入的参数都放进去参与计算了。
```

剩余参数会存储位于它的声明之后的所有参数。意思是说，function avg(firstValue,...args)会将传递给函数的第一个值存储再firstValue中。剩余的参数存储再args中。

如果有一个接收一组参数的函数并且已经将这些参数存储在数组中，那就可以在函数调用中使用展开语法将数组展开为一组元素。avg(...numbers)

- ### 默认参数语法

默认参数语法允许被忽略的参数有默认值。

```
function avg(firstValue,secondValue,thirdValue = 0){
	return (first Value + thirdValue + thirdValue)/3;
}
avg(1,2);//1，而不是NaN
```

## 对象解构

JavaScript没有具名参数，然而我们可以使用对象结构来实现具名参数。对象解构可以方便实现打包和解包。

```
//注意花括号{}，代表在结构对象
function area({width,height}){
	return width * height;
}
//这里的{}括号创建了一个新对象
console.log(area({width:2,height:3}));
```

## 匿名函数

JavaScript可以创建匿名函数，就是没有名字的函数。

```
//function后面并没有名字
const avg = function (...args){
	let sum =0;
	for(const item of args){
		sum += item;
	}
	return sum / args.length;
};
```

这样就可以用参数调用avg()激活匿名函数。其实跟function avg()是等价的，也有return。

### 箭头函数

```
const avg = (...avgs) => {
	let sum = 0;
	for(const item of args){
	sum += item;
	}
}
```

### 立即调用函数表达式(IIFE)

```
(function (){
//...
})()
```

个人不喜欢这个，可读性比较差。

递归函数

JavaScript能递归地调用函数，这个对处理树结构尤其有用，例如DOM中的树结构（不太懂）。

```
function countChars(elm){
if(elm.nodeType === 3){
	//TEXT_NODE
	return elm.nodeValue.length;
	}
	let count =0;
    for(let i =0;child;(child = elm.childNodes[i]);i++){
    count += countChars(child);
    }
    return count;
}
```

也可以对函数表达式命名，这样就可以进行递归

```
const charsInBody = (function counter(elm){
	if(elm.nodeType === 3){
	//TEXT_NODE
	return elm.nodeValue.length;
	}
	let count = 0;
	for(let i =0;child;(child = elm.childNodes[i]);i++){
	count += counter(child);
	}
	return count;
}(document.body));
```

上面的示例中给函数表达式提供的名字仅在函数的自有作用域中可用。这可让引擎执行更多的优化并生成更可读的代码。名字也能在调试器和一些栈追踪中显示，能节省调试时间。

函数式编程，要注意JavaScript中递归对性能的影响。虽然语言规范规定了尾递归优化（这是什么？），但由于恢复栈追踪和调试的困难，只有JavaScriptCore(用于Safari)实现了它。对于深递归，考虑使用迭代作为替代，避免栈溢出。

## 函数是头等对象

怎么理解头等对象？就是它们可以被赋值给变量、作为参数被传递给其他函数、作为其他函数的返回值。此外，JavaScript支持开箱即用不需要显式捕获的闭包（闭包是什么？写一个帖子解释），让你能方便地应用函数式编程风格。

```
//返回函数的函数
const add = (x) => (y) => x+y;
//接收函数的函数
const babies = ["dog","cat","cock"].map((name)=>`${name}babies`)
```

就是说变量可以接收函数，函数也可以接收函数

## 内部函数

可以在其他函数内部声明JavaScript函数。JavaScript中嵌套函数一个特点是它们能访问它们父函数作用域中的变量。

```
function parentFunc(){
	const a=1;
	function nestedFunc(){
		const b=4;//parentFunc 不能使用这个变量
		return a+b;
	}
	return nestedFunc();//5
}
```

这个特点提供了很多实用方法。如果被调用的函数依赖一两个其他的函数，那么他直接可以写在函数内部。可以减少全局作用域中的函数数量。

在书写复杂代码时，通常都喜欢用全局变量在多个函数之间共享值。但其实这样做是不好的，让代码变得难以维护。嵌套函数可以共享父函数的变量。这样还可以省下很多全局变量，不会污染全局命名空间。

# 类

JavaScript提供类语法，和Java很相似。

```
class Person {
	constructor(name){
		this.name = name;
	}
	sayHello(){
		return `你好,我是${this.name}!`;
	}
}
const p = new Person("玛丽亚");
console.log(p.sayHello());
```

JavaScript类只是必须使用new运算符初始化的函数。每次实例化类时，它会返回一个包含类所指定的方法和属性的对象。类并不强制执行代码组织，例如，你可以有返回类的函数，你可以每个文件有多个类。（类比较随意）

```
const withAuthentication = (cls) =>
	class extends cls {
		authenticate(){
		//...
		}
	};
	
class Admin extends withAuthentication(Person){
	//...
}
```

在前面添加static创建静态属性。在前面添加#号，不是private创建私有属性。井号是属性名不可缺少的一部分。（把#当作Python中的_）。与大多数其他语言不同，绝对没有办法再类体外读取私有属性，甚至再派生类中也不行。

# 异步编程

JavaScript本质上是单线程的。没有并行，只有并发。异步编程是由事件循环驱动，事件循环准许一组任务入队并轮询任务直至完成。

在JavaScript中，有三种惯用的书写异步代码的方式：

1.基于回调的(例如setTimeout())

2.基于Promise的

3.async/await，是Promise的语法糖

例如，JavaScript中读取文件的操作:

```
//基于回调的
fs.readFile(filename,(err,content) => {
	//在读取文件时激活回调，可能需要一会才读取文件
	if(err){
		throw err;
	}
	console.log(content);
});

//这里的代码会在等待读取文件的期间被执行

//基于Promise的
fs.readFile(filename).then((content) => {
	//读取文件时发生的事
	console.log(content);
}).catch((err) => {
	throw err;
});
//这里的代码会在等待读取文件的期间被执行

//Async/await
async function readFile(filename){
	const content = await fs.readFile(filename);
	console.log(content);
}
```

核心语言并没有指定任何的异步编程特性，但在与外补环境交互时，这个特性非常重要，从询问用户权限，获取数据，到读取文件。保持潜在地长时间运行的操作异步能确保这个操作等待期间其他进程仍然能运行。例如，在等待用户点击按钮授予权限期间，浏览器不会冻结。

如果有一个异步的值，同步地得到这个值是不可能的。如果有一个promise，你只能通过then()方法访问最终的结果。同样地，await只能被用于异步上下文中，异步上下文通常是异步函数或模块。promise是永不阻塞的。只是依附于promise的结果的逻辑会被延迟。在此期间，其余部分继续执行。如果你是函数式编程者，你可以将promise当作单子（什么是单子？），可以用then()映射promise(然而,promise不是严格意义上的单子，它们会自动展平；例如，你不能有Promise<Promise<T>>)

关于Promise,异步JavaScript，会单独用一个帖子总结。

# 模块

JavaScript也制定了一个大多数运行时都支持的模块系统。一个模块通常是一个文件，由文件的文件路径或URL标识。可以使用import和export语句在模块间交换数据：

```
import { foo } from "./foo.js";

//未导出的变量是模块的本地变量
const b = 2;

export const a = 1;
```

JavaScript模块解析完全由宿主定义，通常基于URL或文件路径，因此相对文件路径就能有效，并且相对的是当前模块的路径，而不是某个项目的路径。

# 语言和进行时

在本文中，我们不断提及某个特性是语言级别的，而其他的则是运行时级别的。

JavaScript是通用型脚本语言。核心语言规范是专注于纯计算逻辑的。它不处理任何的输入/输出——实际上，没有额外的运行时级别的API（特别是console.log()），JavaScript程序的行为是完全不可以预测的。

运行时或宿主将数据反馈给JavaScript引擎（解释器）、提供额外的全局属性，为引擎提供钩子与外部世界交互。模块解析、读取数据、打印消息、发送网络请求等都是运行时级别的操作。自诞生以来JavaScript已被各种环境所采用，例如浏览器、Node.js。JavaScript已经成功整合到Web/移动应用/桌面应用/服务器端应用/无服务/嵌入式系统等等。

在学习JavaScript核心特性的同时，了解宿主提供的特性也很重要，以便将知识付诸实践。可以阅读所有的Web平台API，由浏览器实现，有时候非浏览器宿主也会实现。

# 继承与原型链

继承是什么意思？将特性从父代传递给子代，以便新代码可以重用并基于现有代码的特性进行构建。JavaScript使用对象实现集成，每个对象都有一条链接到另一个称作原型的对象的内部链。该原型对象有自己的原型，依次类推，直到原型是null的对象。

根据定义来说，null没有原型，并是原型链中的最后一环。

在运行时，修改原型链的任何成员甚至换掉原型都是有可能的。

实际上，原型继承模型要比类式模型更强大。例如，在原型模型的基础上构建类式模型（即类的实现方式）相当简单。

尽管类现在被广泛使用并成为JavaScript中新的范式，但是类并没有引入新的继承模式。尽管类抽象掉了大部分的原型机制，但是理解原型的底层工作机制仍十分有用。

## 基于原型链的继承

### 继承属性

JavaScript对象式动态的属性，称为自有属性“包”。JavaScript对象有一条指向原型对象的链。当试图访问对象的属性时，不仅在该对象上查找属性，还会在该对象的原型上查找属性，以及原型的原型。以此类推，指导找到一个名字匹配的属性，或者到达原型链的末尾null。

指定对象的[[Prototype]]方法有：

现在使用--proto--语法进行说明。

```
在像{a:1,b:2,__proto__:c}这样的对象字面量中，值c将变成字面量所表示的对象的[[Prototype]]，而其他像a和b这样的键就会变成对象的自有属性。
```

```
const o = {
	a:1,
	b:2,
	// __proto__设置了[[Prototype]]。在这里它被指定为另一个对象字面量。
	__proto__:{
	b:3,
	c:4
	}
}

//o.[[Prototype]]具有属性b和c
//o.[[Prototype]].[[Prototype]]是Object.prototype
//最后，o.[[Prototype]].[[Prototype]].[[Prototype]]是null（o的原型的原型的原型的原型，这个就是原型链的末尾）
//因为根据定义，null没有[[Prototype]]
//{a:1,b:2} ===> {b:3,c:4} ===> Object.prototype ===> null

console.log(o.a);//1
//o上是否有自有属性a?有，其值为1

console.log(o.b);//2
//o上有自有属性吗？有的其值为2
//原型上也有“b”属性，但没有被访问
//这被称为属性屏蔽（Property Shadowing）

console.log(o.c);//4
//o上有自有属性c吗？没有，检查其原型
//o.[[Prototype]]上有自有属性"c"吗？有，其值为4

console.log(o.d);//undefined
//o上有自有属性d吗？没有，检查其原型
//o.[[Prototype]]上有自有属性"d"吗？没有，检查其原型
//o.[[Prototype]].[[Prototype]]上有自有属性d吗？没有，且这个是Object.Prototype，它默认没有d属性，检查其原型
//o.[[Prototype]].[[Prototype]].[[Prototype]]为Null，停止搜索
//未找到该属性，返回undefined
```

给对象设置属性会创建自有属性。获取和设置行为规则的唯一例外是当它被getter或setter拦截时。

同理，可以创建更长的原型链，并在所有的原型链上查找属性。

```
const o = {
  a: 1,
  b: 2,
  // __proto__ 设置了 [[Prototype]]。在这里它被指定为另一个对象字面量。
  __proto__: {
    b: 3,
    c: 4,
    __proto__: {
      d: 5,
    },
  },
};

// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> { d: 5 } ---> Object.prototype ---> null

console.log(o.d); // 5

//这里就是有o.[[Prototype]].[[Prototype]].[[Prototype]]才是Object.prototype
```

### 继承方法

JavaScript中定义方法的形式和基于类的语言定义方法的形式不同。在JavaScript中，对象可以以属性的形式添加函数。继承的函数与其他属性一样，包括属性遮蔽（在这种情况下，是一种方法重写的方式）

当执行继承的函数时，this值指向继承对象而不是将该函数作为其自有属性的原型对象。

```
const parent = {
	value:2,
	method(){
		return this.value + 1;
	},
};

console.log(parent.method());//3
//当调用parent.method时，"this"指向parent?

//child是一个继承了parent的对象
const child = {
	__proto__:parent,
};
console.log(child.method());//3
//调用child.method时，"this"指向child
//又因为child继承的是parent的方法
//首先在child上寻找属性"value"
//然而，因为child没有名为"value"的自有属性，该属性回在[[Prototype]]上被找到，即parent.value

child.value = 4;//将child上的属性"value"赋值为4
//这会遮蔽parent上的value属性
//child对象现在看起来是这样的
//{value:4,__proto__:{value:2,method:[Function]}}
console.log(child.method());//5
//因为child现在拥有value属性,this.value现在表示child.value
```

## 构造函数

```
const boxes = [
	{value:1,getValue(){return this.value;}},
	{value:2,getValue(){return this.value;}},
	{value:3,getValue(){return this.value;}},
]
```

这样会很冗余，所以我们可以将getValue移动到[[Prototype]]上

```
const boxPrototype = {
	getValue(){
		return this.value;
	};
};

const boxes = [
	{value:1,__proto__:boxPrototype},
	{value:2,__proto__:boxPrototype},
	{value:3,__proto__:boxPrototype},
]
```

这样所有的盒子的getValue都会引用相同的函数，降低内存使用率。但是手动绑定proto还是很麻烦，所以引出构造函数new

```
Box.prototype.getValue = function(){
	return this.value;
};

const boxes = [new Box(1),new Box(2),new Box(3)];
```

我们说new Box(1)是通过Box构造函数创建的一个实例。Box.prototype与我们之前创建的boxPrototype并无太大区别，它只是普通对象。