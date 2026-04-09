---
title: "前端八股文_JS基础_ES6新特性"
date: 2025-11-13 12:06:31
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - javascript
description: "常用的ES6的新特性："
categories:
  - 前端知识库
  - JavaScript
---
## 常用的ES6的新特性：

### 1.1 let和const命令

都是具有块级作用域的属性

1.变量不能重复声明

2.let有块级作用域：不仅仅针对花括号，例如if()里面也不行，这个例子里面的变量girl只在花括号{}内部有效，外部访问就会报错。

```
{
	let girl = '123'
}
console.log(girl)//error
```

3.不存在变量提前

```
console.log(a) //error
let a='123'
```

4.不影响作用域链

```
let school = 'abc'
function fn(){
	console.log(school)//abc
}
```

作用域链的概念：当在当前作用域找不到变量时，会沿着嵌套关系逐级向上查找的机制，在这个例子中，在fn()函数中，找不到school变量，于是就网上查找，找全局作用域。

### 1.2 const

特性:声明常量

const A = 'abc'

1.一定要赋初始值

2.一般常量使用大写（潜规则）

3.常量的值不能修改

4.也具有块级作用域

```
{
	const pyaler = 'uzi'
}
console.log(player)//error
```

5.对于数组和对象的元素修改，不算作对常量的修改，因为常量的地址没有变化。

```
const team = ['33','22','11']
team.push('44');//不报错，因为常量的地址没有变化
```

### 1.3解构赋值

ES6允许按照一定模式从数组和对象中提取值，对变量进行赋值，这被称为解构赋值

数组的解构：

```
const F4 = ['小沈阳'，'刘能','赵四','宋小宝']
let [xiao,liu,zhao,song] = F4; 
console.log(xiao)//小沈阳
console.log(liu)//刘能
console.log(zhao)//赵四
console.log(song)//宋小宝
```

对象的解构：

```
const zhao = {
    name : '赵本山'，
    age: '不详',
    xiaopin: function(){
        console.log("我可以演小品")
    }
}
let {name,age,xiaopin} = zhao;//新建了一个数组，将
console.log(name);
console.log(age);
console.log(xiaopin);

```

### 1.4模板字符串

特性：

1.声明

```
let str=`我是一个字符串`
console.log(str,typeof str);
```

2.内容中可以直接出现换行符

```
let str = `<ul>
			<li>RHF</li>
			<li>RHF</li>
		   </ul>`；
```

3.变量拼接

```
let lovest = 'RHF';
let out = `${lovest}222`
console.log(out)//RHF222
```

1.4 对象的简化写法

介绍：ES6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法

特性：

```
let name = 'aaa';
let change = function(){
	console.log('aaa');
}
const school = {
	name,
	change,
	imporve(){
		console.log(bbb)
	}
}
```

### 1.5箭头函数

ES6允许使用箭头()=>{}定义函数

特性：1.this是静态的，this始终指向函数声明时所在作用域下的this的值

```
function A(){
	console.log(this.name)
}
let B =()=>{
	console.log(this.name)
}

window.name = '尚硅谷';
const school ={
	name:'ATGUIGU'
}

//直接调用
A()//尚硅谷
B()//尚硅谷

//call
A.call(school);//ATGUIGU
B.call(school);//尚硅谷
```

call函数是改变函数的指向对象，这个时候我们可以发现，箭头函数的this依然指向的是全局作用域。所以说，普通函数的this是静态的，可以通过call/bind/apply来改变，但是箭头函数的this是静态的，在定义时已经确定，无法改变。个人认为箭头函数静态的this会更好，不需要讨论this的指向问题。

#### *拓展一个this的绑定规则

1.this的默认绑定（独立的函数调用）

```
function showThis(){
	console.log(this);
}
showthis();//浏览器中是window,node.js中是global
```

2.隐式绑定（方法调用）

```
cosnt person = {
	name:'Alice',
	greet:function(){
		console.log(`Hello,I'm${this.name}`)
	}
}
//方法赋值给变量 - 隐式绑定丢失
const greetFunc = person.greet;
greetFunc();//Hello,I'm ${undefined} - this指向了全局
//回调函数中的隐式丢失
setTimeout(person.greet,100);//Hello,I'm undefined
```

3.显式绑定（call/apply/bind）

```
function introduce(){
	console.log(`I'm {$this.name}`)
}
const person1 = {name:'Alice'}
const person2 = {name：'Bob'}

//call/apply - 立即执行
introduce.call(person1)//I'm Alice
introduce.apply(person2)//I'm Bob
//bind - 返回新函数
const boundIntroduce=introduce.bind(person1);
boundIntroduce();//I'm Alice
```

4.new绑定（构造函数）

```
function Person(name){
	this.name = name;
	console.log(this);//Person {name:'Alice'}
}
const alice = new Person('Alice');
```

5.箭头函数（词法作用域）

```
const obj={
	name:'Alice',
	normalFunc:function(){
		console.log(this.name);//Alice
	},
	arrowFunc:()=>{
		console.log(this.name);//undefined(指向外层作用域)
	}
};
obj.normalFunc();//Alice
obj.arrowFunc();//undefined
```

箭头函数永远指向外层作用域，this不会改变的，始终指向外层作用域

2.不能作为构造实例化对象

```
let A(name,age)=>{
	this.name=name;
	this.age=age;
}
let me = new A('xiao',123)
console.log(me);//error
```

3.不能使用arguments变量

```
let fn =()=>{
	console.log(arguments);
}
fn(1,2,3)//error
```

*arguments变量

是一个在普通函数内部可用的类数组对象，包含了传递给函数的参数信息。

4.简写

```
let add = n => {
	return n+1;
}
```

省略花括号，当代码体只有一条语句的时候，此时return也必须省略

```
let add = n => n+1
```

（我不是很喜欢这样写，感觉可读性很差）

### 1.6函数参数默认值

ES6允许给函数参数赋值初始值

可以给形参赋初始值，一般位置要靠后（潜规则）

```
function add(a,b,c=12){
	return a+b+c;
}
let result = add(1,2);
console.log(result)//15
```

2.与解构赋值结合

```
function A({host='127.0.0.1',username,password,port}){
	console.log(host+username+password+port)
}
A({
	username:'ran',
	password:'123456',
	port:3306
})
//127.0.0.1ran1234563306
```

### 1.7rest参数

ES6引入rest参数，用于获取函数的实参，用来代替arguments

*arguments和rest的对比

| 特性         | `arguments`    | Rest 参数 (`...args`) |
| :----------- | :------------- | :-------------------- |
| **类型**     | 类数组对象     | 真正的数组            |
| **箭头函数** | 不可用         | 可用                  |
| **可读性**   | 隐式存在       | 显式声明              |
| **数组方法** | 不能直接使用   | 可以直接使用          |
| **同步性**   | 与形参可能同步 | 独立存在              |

用法及对比

```
// arguments - 隐式存在，无需声明
function traditionalFunc(a, b) {
    console.log('命名参数:', a, b);
    console.log('arguments:', arguments);
    console.log('参数个数:', arguments.length);
}

traditionalFunc(1, 2, 3, 4);
// 输出：
// 命名参数: 1 2
// arguments: [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
// 参数个数: 4
```

```
// Rest 参数 - 需要显式声明
function modernFunc(a, b, ...restArgs) {
    console.log('命名参数:', a, b);
    console.log('rest参数:', restArgs);
    console.log('rest参数个数:', restArgs.length);
}

modernFunc(1, 2, 3, 4);
// 输出：
// 命名参数: 1 2
// rest参数: [3, 4]
// rest参数个数: 2
```

其实我的理解是，arguments和rest函数都是一个容器，给你的函数形参做填补的。比如说定义了给函数传入1，2，3，4，然后实际上存了1，2，3，4到arguments参数，在console.log函数的时候，如果只有a,b，就只print前面两个

Rest函数要在函数形参里声明...restArgs，我是认为这样会更明显一些。

例子上写，传入了1，2，3，4，函数形参只有(a,b,args)，此时a,b对应1，2，然后剩余的装进rest参数里，所以print出来是[3,4]，rest参数就有2。而且rest参数可以用于箭头函数当中

### 1.8扩展运算符

扩展运算符是能将数组转换为逗号分隔的参数序列

```
const tfboys=['AA','BB','CC']
function chunwan(){
	console.log(arguments);
}
chunwan(..tfboys);//0:'AA' 1:'BB' 2:'CC'
```

应用

1.数组的合并

```
const A=['aa','bb','cc']
const B=['cc','dd']
const C=[..A,..B]
const.log(C)//[aa,bb,cc,dd]
它自己可以识别，然后将数组合并
```

2.数组的克隆

```
const A = ['a','b','c'];
const B = [..A];
console.log(B)//[a,b,c]
```

3.将伪数组转换成真正的数组

```
const A = documents.querySelectorAll('div');
const B = [..A];
console.log(B)//[div,div,div]
//其实A这里获取的是操作DOM之后的选择器，并不是真正的数组，然后B就用扩展运算符..A，转化成了字符
```

### 1.9 Symbol

ES6引入了新的原始数据类型Symbol，表示独一无二的值，它是JavaScript里第七种数据类型，是一种类似于字符串的数据类型。

Symbol特点：

Symbol的值是唯一的，用来解决命名冲突的问题

Symbol的值不能与其他数据进行运算

Symbol定义的对象属性不能使用 for..in循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名

1.创建

```;
let s = Symbol('aa');
let s2= Symbol('aa');
console.log(s===s2)	//false

let s3 = Symbol.for('bb');
let s4 = Symbol.for('bb');
console.log(S3===S4)//TRUE
```

普通的Symbol(每次都是新的地址)

但是使用Symbol.for()（全局共享）

2.不能与其他数据进行运算

3.Symbol内置值

```
class Person{
	static [Symbol.hasInstance](param){
		console.log(param);
		console.log("我被用来检测了");
		return false;
	}
}
let o = {};
console.log(o instanceof Person);//我被用来检测了，false
```

1.给对象添加方法 方式一:

```
let game = {
	name:'ran'
}
let methods = {
	up:Symbol()
	down:Symbol()
}
game[methods.up]=function(){
	console.log('aaa');
}
```

2.给对象添加方法 方式二：

```
let youxi = {
	name:'狼人杀',
	[Symbol('say')]:function(){
		console.log('asd')
	}
}
console.log(youxi)	//name:'狼人杀',Symbol(say)
```

### 1.10 迭代器

1.迭代器(Iterator)是一种接口，为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署Iterator接口，就可以完成遍历操作。

2.原理：创建一个指针对象，指向数据结构的起始位置，第一次调用==next() ==方法，指针自动指向数据结构第一个成员，接下来不断调用next()，指针一直向后移动，直到指向最后一个成员，没调用next()返回一个包含value和done属性的对象。

```
const xiyou=['AA','BB','CC','DD']
for(let v of xiyou){
	console.log(v)	//
}
```

## ES7-ES10的新特性：