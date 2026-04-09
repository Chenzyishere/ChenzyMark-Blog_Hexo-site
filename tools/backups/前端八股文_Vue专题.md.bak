---
title: "前端八股文——Vue专题"
author: Chenzy
date: 2025-10-05 10:00:00
updated: 2026-04-09 00:00:00
categories:
  - 前端知识库
  - Vue
tags:
  - frontend
  - vue
  - javascript
  - html
  - css
  - network
description: "Vue 核心概念、生命周期与路由模式总结。"
---
# 前端八股文——Vue专题

# VUE2系列

## 丢�、对于MVVM的理�?

MVVM是Model-View-ViewModel的缩�?

Model：代表数据模型，也可以在Model中定义数据修改和操作的业务��辑

View：代表UI组件，负责将数据模型转化成UI展现出来

ViewModel通过双向数据绑定把View层和Model层连接起来，而View和Model之间的同步工作完全是自动的，无需认为干涉，所以开发��只霢�要关注业务��辑，不霢�要手动操作DOM，不霢�要关注数据状态的同步问题，复杂的数据状��维护完全由MVVM来统丢�管理�?

![image-20251104103601523](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251104103601523.png)

## 二��Vue的生命周期（Vue2�?

### Vue2

beforeCreate（创建前）在数据观测和初始化事件还未弢��?

 created（创建后）完成数据观测，属��和方法的运算，初始化事�?

beforeMount（载入前�?

在挂载开始之前被调用，相关的render函数首次被调用，实例已完成以下的配置

用上面编译好的html内容替换el属��指向的DOM对象，完成模板中的html渲染到html页面中，进行ajax交互�?

Mounted（载入后�?

调用时机：实例挂载到DOM之后再调�?

特点：可以访问渲染后的DOM元素

常用场景：DOM操作、第三方库初始化、事件监�?

beforeUpdate（更新前�?

在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前，可以在该钩子中进一步地更改状��，不会触发附加的重渲染过程�?

updated（更新后�?

在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM地操作��?

然��在大多数情况下，应该避免在此期间更改状态，因为这可能会导致无限更新循环，该钩子在服务器渲染期间不可调用�?

beforeDestroy（销毁前）��?

在实例销毁之前调用，实例仍然完全可用�?

destroyed（销毁后）在实例锢�毁之后调用��调用后，所有的事件监听器将会被移除，所有的子实例会被销毁��该钩子在服务器渲染期间不被调用�?

使用keep-alive，会涉及activated和deactivated钩子�?

### 相关问题�?

#### 1.仢�么是Vue生命周期�?

Vue实例从创建到锢�毁的过程，就是生命周期��从弢�始创建��初始化数据、编译模板��挂载DOM->渲染、更�?>渲染、销毁等丢�系列过程，称之为Vue的生命周期��?

#### 2.Vue生命周期的作用是仢�么？

它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的��辑

#### 3.Vue的生命周期��共有几个阶段？

可以分为八个阶段，创建前/后，载入�?后，更新�?后，锢�毁前/�?

#### 4.第一次页面加载会触发哪几个钩子？

会触发beforeCreate,created,beforeMount,mounted

#### 5.DOM渲染在哪个周期中就已经完成？

DOM渲染在mounted中就已经完成

## 三��Vue实现数据双向绑定的原理：

### Object.defineProperty()

Vue2实现数据双向绑定，采用数据劫持结合发布��?订阅者的模式，��过Object.defineProperty()劫持各个属��的setter,getter,在变动的时��发布消息给订阅者触发回调��?

当把丢�个JS对象传给Vue的时候，Vue就遍历它的属性用Object.defineProperty将它们转为getter/setter。用户看不到他们但是内部已经是用Vue追踪依赖�?

vue的数据双向绑定将MVVM作为数据绑定的入口，整合Observer，Compile和watcher三��?

Observer：监听自己model的数据变�?

Compile:解析编译模板指令

watcher:搭起observer和compile之间通信桥梁，达到数据变�?>视图更新

视图交互变化(input)->数据Model变更双向绑定效果

 js实现箢�单的双向绑定�?

```
<body>
    <div id="app">
    <input type="text" id="txt">
    <p id="show"></p>
</div>
</body>
<script type="text/javascript">
    var obj = {}
    Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            document.getElementById('txt').value = newValue
            document.getElementById('show').innerHTML = newValue
        }
    })
    document.addEventListener('keyup', function (e) {
        obj.txt = e.target.value
    })
</script>
```

## 四��Vue组件间的参数传��?

1.父组件与子组件传�?

父组件传给子组件，子组件通过props方法接受数据

子组件传给父组件�?emit方法传��参�?

```
<div>
	<ChildComponent
		:title="parentTitle"
		:count="parentCount"
		:isVisible="true"
		@child-event="handleChidEvent"
		/>
<div/>

<script>
import ChildComponent from './ChildComponent.vue'

export default{
	components:{ChildComponent},
	data(){
		retrun {
			parentTitle:'来自父组件的标题',
			
		},
		methods:{
			handleChildEvent(data){
				log('子组件传递的数据:',data)
			}
		}
	}
}

Child

<script>
export default{
//数组接收
props:['title','count','user','isVisible']
//对象接收
props:{
	title:String,
	count:[String,Number],
	user:{
		type:Object,
		required:true
	},
	isVisible:{
		type:Boolean,
		default:false
	}
	.....
	methods:{
		sendToParent(){
			//通过$emit向父组件发��事�?
			this.$emit('child-event',{
				message:'来自子组件的数据',
				timestamp:new Date()
			})
		}
	}
}
}
```

使用v-model实现双向绑定

```
子组�?
<input
	:value="value"
	@input="$emit('input',$event.target.value)"
	@blur="$emit('blur')"
	/>
	
<script>
	export default{
		props:['value'],
		//使用model选项自定义v-model的行�?
		model:{
			prop:'value',
			event:'input'
		}
	}
```



2.非父子组件间的数据传递，兄弟组件传��?

eventBus事件总线，创建一个事件中心，相当于中转站，可以用来传递事件和接收事件，很少用�?

创建Event Bus

3.Vuex、Pinia状��管�?

非父子组件间的数据传递，用Vuex和Pinia的方式来传��?

## 五��Vue的路由实现：hash模式和history模式

hash模式：在浏览器中符号"#"�?以及#后面的字符称之为hash，用window.location.hash读取

特点：hash虽然在URL中，但不被包括在HTTP请求中，用来指导浏览器动作，对服务端安全无用，hash不会重加载页靃6�9��?

hash模式就是在浏览器符号#以及后面的字符就是hash，特点是哈希模式下url不美观，SEO不友好不利于页面索引，��且只能够��过url传��字符串参数。不过方便不霢�要做路由器额外配置，url�?符号部分不会发��到服务器，浏览器就只需要请求一个网坢�扢�有的路由逻辑都是在前端完成的�?

history模式：history采用HTML5的新特��，提供两个新方�?

History模式下就是有路径的，对SEO友好，url美观，不过缺点就是要做一下路由器的配置——且在history模式下，前端的URL必须要跟后端的URL是一致的，否则会请求不到资源返回404错误�?



Vue-Router官网里如此描述：不过这种模式要玩好，还需要后台配置支持——所以呢，你要在服务端增加一个覆盖所有情况的候��资源：如果 URL 匹配不到任何静��资源，则应该返回同丢��?index.html 页面，这个页面就是你 app 依赖的页�?

## 六��Vue与Angular以及React的区别？

1.与AngularJS的区�?

相同点：都支持指令：内置指令和自定义指令，都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定；都不支持低端浏览器

不同点：AngularJS的学习成本高，增加Dependency Injection特��，而Vue.js本身提供的API都比较简单直观，在��能上，AngularJS依赖对数据做脏检查，扢�以watcher越多越慢；Vue.js使用基于依赖追踪的观察并且使用异步队列更新，扢�有数据独立触�?

2.与React区别

相同点：React采用特殊JSX语法，Vue.js在组件开发中也推崇编�?vue特殊文件格式，对文件内容都有约定，两者都霢�要编译后使用，中心��想相同：一切都是组件，组件之间可以互相嵌套；提供合理的钩子函数，可以让弢�发��定制化处理霢�求；都不内置AJX,Route到核心包，以插件的方式加载，在组件开发中都支持mixins的特性��?

不同点：React采用的Virtual DOM会对渲染出来的结果做脏检查；Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷操作Virtual DOM

## 七��VUE路由的钩子函�?

首页可以控制导航跳转，beforeEach,afterEach等，丢�般用于页面title修改，一些需要登录才能调整页面的重定向功能��?

beforeEach主要有三个参数，to from next

to:route即将进入的目标路由对�?

from:route当前导航正要离开的路�?

next:function丢�定要调用该方法resolve这个钩子，执行效果依赖next方法的调用参数，可以控制网页的跳�?

## 八��Vuex是什么？如何使用？哪种功能场景使用？

只用来读取的状��集中放在Store中，改变状��的方式是提交mutations，这是个同步的事物；异步逻辑应该封装在action中��?

在main.js引入store，注入，新建目录store,...export

场景有：单页应用中，组件之间的状态��音乐播放��登录状态��加入购物车

![image-20251104133346392](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251104133346392.png)

### state

Vuex使用单一状��树，即每个应用将仅仅包含一个store实例，但单一状��树和模块化并不冲突，存放的数据状��，不可以直接修改里面的数据�?

### mutations

mutations定义的方法动态修改Vuex的store中的状��或数据

### getters

类似于vue的计算属性，主要用于过滤数据

### action

actions可以理解为��过将mutations里面处理数据的方法变成可以异步处理数据的方法，简单来说就是异步操作数据，view层��过store.dispatch来分发action

```
const store = new Vuex.Store({ //store实例
      state: {
         count: 0
             },
      mutations: {                
         increment (state) {
          state.count++
         }
          },
      actions: { 
         increment (context) {
          context.commit('increment')
   }
 }
})
```

### modules

项目复杂时，可以让每丢�个模块拥有自己的state mutation action getters，使得结构清晰方便管�?

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
 }
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
 }

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
})
```

## 九��vue-cli新增自定义指�?

### 1.创建屢�部指�?

```
var app = new Vue({
	el:'#app',
	data:{
	},
	//创建指令（可以多个）
	directives:{
		//指令名称
		dir1:{
			inserted(el){
				//指令中第丢�个参数是当前使用指令的DOM
				console.log(el);
				console.log(arguments);
				//对DOM进行操作
				el.style.width = '200px';
				el.style.height = '200px';
                el.style.background = '#000';
			}
		}
	}
})
```

### 2.全局指令�?

```
Vue.directive('dir2',{
	inserted(el){
		console.log(el);
	}
})
```

### 3.指令的使�?

```
<div id="app">
    <div v-dir1></div>
    <div v-dir2></div>
</div>

```

## 十��vue如何自定义一个过滤器�?

html代码�?

```
<div id="app">
	<input type="text" v-model="msg" />
	{{msg | capitalize}}
</div>
```

JS代码�?

```
var vm =new Vue({
	el:'#app',
	data:{
		msg:''
	},
	filters:{
		capital
	}
})
```

全局定义过滤�?

```
Vue.filter('capitalize',function (value){
	if(!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase()+value.slice(1)
})
```

过滤器接收表达式的��?msg)作为第一个参数，capitalize过滤器将会收到msg的��作为第丢�个参�?

## 十一、对keep-alive的了�?

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲�?

在vue 2.1.0版本之后，keep-alive加入两个属��：inclue（包含的组件缓存）与exclude（排除的组件不缓存，优先级大于include�?

使用方法

```
<keep-alive include='include_components' exclude='exclude_components'>
	<component>
	//该组件是否缓存取决于include和exclude属��?
	</component>
</keep-alive>
```

参数解释�?

include - 字符串或正则表达式，只有名称匹配的组件会被缓�?

exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓�?

include和exclude的属性允许组件有条件地缓存，二��都可以�?,"分隔字符串，正则表达式，数组。当使用正则或��是数组时，要记得使用v-bind

使用示例

```
<!-- 逗号分隔字符串，只有组件a与b被缓存��?-->
<keep-alive include="a,b">
  <component></component>
</keep-alive>

<!-- 正则表达�?(霢�要使�?v-bind，符合匹配规则的都会被缓�? -->
<keep-alive :include="/a|b/">
  <component></component>
</keep-alive>

<!-- Array (霢�要使�?v-bind，被包含的都会被缓存) -->
<keep-alive :include="['a', 'b']">
  <component></component>
</keep-alive>
```

## 十二、一句话就能回答地面试题

**1.css只能在当前组件起作用**

在style标签中写入scoped即可，例�?style scoped><style>

**2.v-if和v-show的区�?*

v-if按照条件是否渲染，v-show是display的block或none

**3.$route�?router的区�?*

$route是��路由信息对象��，包括path,params,hash,query,fullPath,matched,name等路由信息参数，�?router是��路由实例��对象包括了路由的跳转方法，钩子函数�?

**4.vue.js的两个核心是仢�么？**

数据驱动，组件系�?

**5.vue集中常用的指�?*

v-for/v-if/v-bind/v-on/v-show/v-else

**6.vue常用的修饰符**

.prevent:提交事件不再重载页面�?stop:阻止单击事件冒泡 .self:当事件发生在该元素本身��不是子元素的时候会触发 .capture:事件侦听，事件发生的时��会调用

**7.v-on可以绑定多个方法吗？**

可以

**8.vue中key值得作用**

当Vue.js用v-for正在更新已渲染过得元素列表时，它默认用��就地复用��策略��如果数据项得顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是箢�单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素��key的作用主要是为了高效的更新虚拟DOM

**9.仢�么是vue的计算属性？computed**

在模板中放入太多的��辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式�?

好处�?.使得数据处理结构清晰 

2.依赖于数据，数据更新，处理结果自动更�?

3.计算属��内部this指向vm实例

4.在template调用时，直接写计算属性名即可

5.常用的是getter方法，获取数据，也可以使用set方法改变数据

6.相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时��computed从缓存中获取，不会重新计�?



说一下watch和computed的区别是仢�么？

都是观察数据变化的，计算属��会混入到vue的实例中，要监听自定义变量��watch监听data props里面的数据的变化

computed就有缓存，它以来的��变了才会重新计算，但是watch就没�?

watch支持异步，computed不支�?

watch是一对多，computed是多对一（监听属性依赖于其他属��）

watch监听函数接收两个参数，第丢�个是朢�新��，第二个是输入之前的——?

computed属��是函数时，都有get/set方法，默认走get方法，get必须有返回��?

watch参数：deep深度监听、immediate:组件加载立即触发回调函数





**10.vue等单页面应用及其优缺�?*

优点：Vue的目标是通过尽可能简单的API实现相应的数据绑定和组合的视图组件，核心是一个相应的数据绑定系统，MVVM、数据驱动��组件化、轻量��简洁��高效��快速��模块友好��?

缺点：不支持低版本浏览器，最低只支持到IE9，不利于SEO优化（如果要支持SEO，建议��过服务器端渲染组件），第一次加载首页��时较长，不可以使用浏览器导航按钮，霢�要自行实现前进后逢�

**11.怎么定义vue-router的动态路由？怎么获取传过来的�?*

在router目录下的index.js文件中，对path属��加�?/:id，使用router对象的params.id获取

SEO优化

预渲�?

服务端渲染SSR

接口请求丢�般放在哪个生命周期中�?

放在created\beforeMount\mounted中，因为在这几个钩子里面都已经完成data的创建，就可以将服务端返回的数据进行赋——?

推荐在created中调用异步请求，因为在created钩子中可以更快获取到服务端数据，减少页面loading的时间��?

SSR不支持beforeMount\mounted钩子函数，所以放在created中有助于代码的一致——?

# VUE3系列

丢�、生命周�?

核心变化

1.组合式API的引�?

setup()替代了beforeCreate()和created()。所有组合式API逻辑在此函数中初始化，替代Vue2的data\method等��项式配�?

钩子函数前缀on。生命周期函数需要从Vue显示导入，如onMounted，且只能在setup()�?script setup>中使�?

2.钩子函数重命�?

beforeDestroy -> onBeforeUnmount

destroyed -> onUnmounted

3.新增钩子

onServerPrefetch。服务器渲染(SSR)期间异步获取数据

调试钩子，onRenderTracked（跟踪响应式依赖）��OnRenderTriggered（响应式变更触发�?

## 生命周期阶段详解

1.初始化阶�?

setup()，替代beforeCreated和created，初始化响应式数据，方法等等。注意：无法访问this

选项式API兼容，替代beforeCreated和created仍可用，但避免与setup()混用

2.挂载阶段

onBeforeMount()组件挂载到DOM前调用，此时虚拟DOM已生成但未渲�?

onMounted()组件挂载完成，可操作DOM或发起网络请�?

3.更新阶段

onBeforeUpdate()数据变化导致DOM更新前触发，适合获取更新前的DOM状��?

onUpdated()DOM更新执行后，避免在此修改状��，可能导致无限循环

4.卸载阶段

onBeforeUnmount()组件卸载前调用，清理定时器，取消网络请求，移除事件监听��?

onUnMounted()组件卸载后触发，此时子组件全部卸�?

其他钩子�?

onErrorCaptured()捕获子孙组件错误，可返回false阻止冒泡

onActivated/onDeactivated()<keepAlive>缓存组件濢��?停用时调�?



高频面试�?

1.父子组件生命周期执行顺序

挂载阶段：父onBeforeMount->子onBeforeMount->子onMounted->父onMounted

更新阶段：父onBeforeUpdate->子onBeforeUpdate->子onUpdated->父onUpdated

卸载阶段：父onBeforeUnmount->子onBeforeUnmount->子onUnmounted->父onUnmounted

2.在setup()中如何访问this?

setup()中没有this，响应式数据通过ref/reactive定义，方法直接声�?

3.异步请求放在哪个钩子�?

客户端渲�?CSR):onMounted(确保DOM可用)

服务端渲�?SSR):onServerPrefetch

二��组件��信

1.Props/Emits（父子��信�?

props（父->子）

```
//父组�?
<Child :title="data" />
//子组�?
<script setup>
defineProps(['title'])
</script>
```

类型校验：defineProps({title:{type:String, required:true }})

单项数据流：子组件不能直接修改props(霢�要��过emit通知父组�?

emits（子->父）

```
//子组�?
<button @click="$emit('update', value)"></button>
//父组�?
<Child @update="handleUpdate" />
```

Vue3特��?defineEmits(['update'])显式声明事件

2.v-model双向绑定（语法糖进阶�?

单��绑�?

```
//父组�?
<Child v-model="message" />
//子组�?
<input :value="modelValue" @input="$emit('update:modelValue',$event.target.value)">

<script setup>
defineProps(["modalValue"])
defineEmits(["update:modelValue"])
</script>
```

多��绑�?

```
<Child v-model:title="title" v-model:content="content" />
```

3.ref/expose（父访问子组件）

模板引用

```
//父组�?
<Child ref="childRef" />
<script setup>
const childRef = ref(null);
//访问子组件暴露的属��?方法
chilRef.value.childmethod();
</script>

//子组�?
const childMethod = () => {}
defineExpose({ childMethod})
```

虚拟DOM

虚拟DOM是一个轻量级的JS对象，它是真实DOM的抽象表示��Vue使用虚拟DOM来优化DOM操作，提高渲染��能

虚拟DOM其实就是在JS里面的一个对象，用来 描述整个文档，然后在操作的时候就只操作虚拟DOM，等到操作完成的时��，再把结果渲染到真实的DOM上面。这样其实就是减少了浏览器的压力，提升了渲染的��能。��且也具备了跨平台的优势�?

其实可以好比JS和DOM之间加了丢�个缓存，在大量��频繁的数据更新下可以对视图进行合理高效的更新��?




