---
title: 前端八股文——HTML&CSS专题
date: 2025-10-31 10:00:00
updated: 2026-03-25 17:51:47
tags:
  - frontend
  - javascript
  - html
  - css
  - seo
  - network
description: "HTML面试题"
categories:
  - 前端知识库
  - HTML-CSS
---
# HTML面试题

##### 1.如何理解HTML语义化？

HTML语义化的定义：使用恰当的HTML标签来表达页面内容的结构和含义，而不仅仅是div/span等通用容器。

优点：

让人更容易读懂（增加代码可读性）

让搜索引擎更容易读懂，有助于爬虫抓取更多有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重（SEO）

在没有CSS样式下，页面也能呈现出很好的内容结构、代码结构

###### 常用的语义化标签

1.文档结构标签

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
<body>
    <header>页面页眉</header>
    <nav>导航区域</nav>
    <main>主要内容</main>
    <article>独立文章</article>
    <section>内容区块</section>
    <aside>侧边栏</aside>
    <footer>页面页脚</footer>
</body>
</html>
```

2.文本内容标签

```
<!-- 标题层级 -->
<h1>主标题</h1>        <!-- 页面最重要的标题，通常只有一个 -->
<h2>章节标题</h2>      <!-- 主要内容区块标题 -->
<h3>子标题</h3>        <!-- 更细分的标题 -->

<!-- 文本语义 -->
<p>段落文本</p>
<blockquote>引用文本</blockquote>
<code>代码片段</code>
<strong>重要内容</strong>    <!-- 语义上的重要 -->
<em>强调内容</em>          <!-- 语义上的强调 -->
<mark>标记文本</mark>
<time datetime="2023-10-01">10月1日</time>
```

3.表单语义化

```
<form>
    <fieldset>
        <legend>个人信息</legend>
        
        <label for="name">姓名：</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">邮箱：</label>
        <input type="email" id="email" name="email" required>
        
        <button type="submit">提交</button>
    </fieldset>
</form>
```

2.Script标签中defer和async的区别？

script：会阻碍HTML解析，只有下载好并执行完脚本才会继续解析HTML

async script:解析HTML过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断HTML的解析。

defer script:完全不会阻碍HTML的解析，解析完成之后再按照顺序执行脚本。

![image-20251026141937549](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251026141937549.png)

1.3从浏览器地址栏输入url到请求返回发生了什么

1.输入URL后解析出协议，主机、端口、路径等等信息，并构造一个HTTP请求

强缓存、协商缓存

2.DNS域名解析

3.TCP链接

4.HTTP请求

5.服务器处理请求并返回HTTP报文

6.浏览器渲染画面

7.断开TCP连接



# CSS

##### 盒模型介绍

CSS3中盒模型有以下两种：标准盒模型、IE（替代）盒模型

两种盒子模型都是由content+padding+border+margin构成，其大小都是由content+padding+border决定的。

但是盒子内容宽/高度（即width/height）的即使算范围根据盒模型的不同会有所不同

标准盒模型：只包含content

IE(替代)盒模型：conten+padding+border

可以通过box-sizing来改变元素的盒模型

box-sizing:content-box:标准盒模型（默认值）

box-sizing:border-box:IE（替代）盒模型

##### CSS选择器和优先级

浏览器通过**优先级**来判断哪一些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类[选择器](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen%2FCSS%2FCSS_Reference%23Selectors)组成的匹配规则。

样式优先级：

!important>style>id>class，但是设计多类选择器作用于同一个元素的时候怎么判断优先级？

优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下：

1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`;
2. `B` 的值等于 `ID选择器` 出现的次数;
3. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数;
4. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 。

*#nav-global > ul > li > a.nav-link*

[选择器参考表](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FLearn%2FCSS%2FBuilding_blocks%2FSelectors%23%E9%80%89%E6%8B%A9%E5%99%A8%E5%8F%82%E8%80%83%E8%A1%A8)。

[深入理解 CSS 选择器优先级](https://juejin.cn/post/6844903709772611592)。

2.3重排(reflow)和重绘(repaint)的理解

重排：无论通过什么方式影响了元素的几何效信息（元素在视口内得位置和尺寸大小），浏览器需要重新计算元素在视口内的几何属性，这个过程叫做重排

重绘：通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，，以及可见节点的样式和具体的几何信息（元素在视口内的位置和尺寸大小，接下来就可以将渲染树的每个节点都转换为屏幕上的实际像素），做这个阶段就叫做重绘

如何减少重排和重绘？

1.最小化重绘和重排：比如样式集中改变，使用添加新样式类名.class和cssText

2.批量操作DOM,比如读取某元素offsetwidth属性存到一个临时变量，再去使用，而不是频繁使用这个计算属性，又比如利用document.createDocumentFragment()来添加要被添加的节点，处理完之后再插入到实际DOM中

使用absolute或fixed使元素脱离文档流，这在制作复杂动画时对性能的影响比较明显。

开启GPU加速，利用css属性transform will-change等，比如改变元素位置，我们使用translate会比使用绝对定位改变其left top等来的高效，因为它不会触发重排或重绘，transform使浏览器为元素创建一个GPU图层，这使得动画元素在一个独立的层中渲染，当元素的内容没有发生改变，就没有必要进行重绘。

###### 回流和重绘

**回流一定会触发重绘，而重绘不一定会回流**

根据改变的范围和程度，渲染树中或大或小的部分需要重新计算，有些改变会触发整个页面的重排，比如，滚动条出现的时候或者修改了根节点。

###### 4.对BFC的理解

BFC即块级格式上下文，根据盒模型可知，每个元素都被定义为一个矩形盒子，盒子的部剧会受到尺寸，定位，盒子的子元素或兄弟元素，视口尺寸等因素决定。所以有浏览器计算的过程，计算的规则就是由一个叫做视觉格式化模型的东西所定义，BFC就是来自这个概念，它是CSS视觉渲染的一部分，用于决定块级盒的布局及浮动互相影响范围的一个区域。

###### BFC具有一些特性：

1.块级元素会在垂直方向一个接一个的排列，和文档流的排序方式一致。

2.在BFC中上下相邻的两个容器的margin会重叠，创建新的BFC可以比肩外边距重叠。

3.计算BFC的高度时，需要计算浮动元素的高度

4.BFC区域不会与浮动的容器发生重叠

5.BFC是独立的容器，容器内部元素不会影响外部元素

6.每个元素的左margin值和容器的左border相接触

##### 解决问题

利用4和6，可以实现三栏（或两栏）自适应布局

利用2，我们可以避免margin重叠问题

利用3，我们可以避免高度塌陷

##### 创建BFC的方式：

绝对定位元素(position为absolute或fixed)

行内块元素，即display为inline-block

overflow的值不为visible

##### 实现两栏布局（左侧固定+右侧自适应布局）

##### 实现圣杯布局和双飞翼布局（经典三分栏布局）

圣杯布局和双飞翼布局的目的：

三栏布局，中间一栏最先加载和渲染（内容最重要，这就是为什么还需要了解这种布局的原因。）

两侧内容固定，中间内容随着宽度自适应

一般用于PC网页

圣杯布局和双飞翼布局的技术总结：

使用float布局

两侧使用margin负值，以便和中间内容横向重叠

防止中间内容被两侧覆盖，圣杯布局用padding，双飞翼布局用magrin

##### 水平垂直居中多种实现方式

1.利用绝对定位，设置left:50%和top:50%将子元素左上角移到父元素中心位置，然后再通过translate来调整子元素的中心点到父元素的中心，该方法可以不定宽高。

```
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

2.利用绝对定位，子元素所有方向都为0，将margin设置为auto，由于宽高固定，对应方向实现平分，该方法必须盒子有宽高。

```
.father {
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  margin: auto;
  height: 100px;
  width: 100px;
}
```

3.利用绝对定位，设置left:50%和top:50%，现将子元素左上角移到父元素中心位置，然后再通过margin-left和margin-top以子元素自己的一半宽高进行负值赋值，该方法必须定宽高

```
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  margin-top: -100px;
}
```

4.利用flex最经典方便

```
.father {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

##### flex布局

flex:1，包含的意思

flex-grow:1 该属性默认为0，如果存在剩余空间，元素也不放大。设置1代表会放大。

flex-shrink:1 该属性默认为1，如果空间不足，元素缩小

flex-basis:0% 该属性定义在分配多余空间之前，元素占据的主轴空间，浏览器就是根据这个属性来计算是否有多余空间的。默认值为auto,即项目本身大小，设置为0%以后，因为有flex-grow和flex-shrink的设置会自动放大或缩小。在做两栏布局时，如果右边的自适应元素flex-basis设为auto的话，其本身大小将会是0.

##### line-height如何继承？

父元素的line-height写了具体数值，比如30px，则子元素line-height继承该值

父元素的line-height写了比例，比如1.5或2，则子元素line-height也是继承该比例

父元素的line-height写了百分比，比如200%，则子元素line-height继承的是父元素font-size*200%计算出来的值

# JS基础

#### 1.数据类型

基本数据类型介绍，及值类型和引用类型的理解

JS中8种基础数据类型，分别为：undefined null Boolean Number String Object Symbol BigInt

其中Symbol和BigInt是ES6新增的数据类型，可能会被单独问

Symbol代表独一无二的值，最大的用法是用来定义对象的唯一属性名

BigInt可以代表任意大小的整数

值类型的数值变动过程如下

let a=100;

let b = a;

a=200

console.log(b);//100

![image-20251030154551011](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251030154551011.png)

引用类型的赋值变动过程如下：

let a = { age:20};

let b = a;

b.age=30;

console.log(a.age)//30

![image-20251030154654912](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251030154654912.png)

1.2数据类型的判断

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

instanceof :能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。比如：

```
class People{}

class Student extends People{}

const vortesnail=new Student()

console.log(vortesnail instanceof People)//true

console.log(vortesnail instanceof Student)//true
```

其实就是顺着原型链去找，如果能找到对应的 xxx.prototype即为true,

##### 手写深拷贝

```
//自定义的高性能遍历方法
function forEach(arr,iterator){
	let index=0
	const len = arr.length
	
	while (index < len){
	iterator(arr[index],index)
	index++
	}
	
	return arr
}

//深拷贝
@param {Object} obj 要拷贝的对象
@param {Map} map 用于存储循环引用对象的地址

//deepClone主代码
function deepClone(obj,map = new WeakMap()){
	//如果类型不是对象，直接返回
	//如String Int null bigInt
	if (typeof obj !== "object"){
	return obj;
	}
	
	//跳出循环条件
	if (map.get(obj)){
	return map.get(obj)
	}
	
	//两种方法判断是不是数组，兼容性考虑
	const isArray = Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
	//这里判断是不是数组
	result = isArray ? [] : {} 
	
	map.set(obj,result)
	
	const iteratorArr = isArray ? obj : Object.keys(obj)
	forEach(iteratorArr,(val,key))=>{
		if(!isArray){
		key = val
		}
		result[key]=deepClone(obj[key],map)
	})
	
	return result
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

console.log(deepClone(target))
}

```

还要考虑其他类型，比如函数（要用到 `eval` 和 `new Function`，我个人觉得这个会违反 CSP，不适合当作第三方库的处理方式）、`Symbol` 和 `Date` 等

根据 0.1+0.2!==0.3，讲讲IEEE 754,如何使其相等？

原因总结：

进制转换：js在做数字计算的时候，0.1和0.2都会被转成二进制后无限循环，但是js采用的IEEE 754二进制浮点运算，最大可以存储53位有效数字，于是大于53位后面的回截掉，导致精度丢失

对阶运算：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移，位数位移时可能会发生数丢失的情况，影响精度

解决办法：

1.转为整数（大数）运算

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

2.使用Number.EPSILON误差范围

function isEqual(a,b){

}