### 1、技术选型


特点 | css | canvas
|---- | ---- | ---- | ---- | 
成本| 简单，少量api就可以做复杂动画| 大量代码做简单动画
性能|可以自动做到优雅降级|需要做代码兼容
灵活性|较差|非常灵活
多状态切换|复杂不好操作|可以优雅做到
临界检测|不能精确做临界点判断|可以做到

> 总结：
 - css: 适合做单一重复少状态切换切复杂的动画
 - canvas：适合做多状态切换简单动画

### 2、思考（如何权衡）

> - 可维护性
> - 开发效率
> - 性能

```
sequenceDiagram
可维护性->>性能: 逻辑清晰，无冗余代码
可维护性->>提升开发速度: 可理解性、可修改性、可测试性
```

<section style="color:red;font-size: 16px;margin-bottom: 20px;">可维护性</section>
    
 > 什么是可维护性代码
 >> 1. 可读性
 >> 2. 适用性
 >> 3. 可扩展性
 >> 4. 可调试性
 

<section style="color:red;font-size: 16px;margin-bottom: 0px;">提升开发速度</section>

```
gantt
dateFormat YYYY-MM-DD
section 个人书店
开发用时6天，4天开发框架，2天写需求: 01, 6d
section 图书漂流
开发4天，1天完善框架，1天设计动效，2天写需求: 01, 4d
section 下一个
2天写需求:01, 2d


```

### 3、绘制canvas

 - 性能（使用最优性能的计算方式、将大量计算放在编译中执行、超出canvas外的视图不予绘制）
 - 布局（用css的api写canvas）
 - 裁剪图片
 - 文字处理
 - 粒子效果
 - 优化
 

### 框架结构图

<section style="color:green;font-size: 16px;margin-bottom: 0px;">1、绘制canvas</section>

```
graph TD
    A[绘制canvas] --> B[compile 编译]
    A --> |编译完成后| K[绘制]
    A --> C[封装事件]
    B --> H[生成DomTree]
    A --> F[注册钩子函数]
    B --> D[建立父子关系]
    B --> E[注册事件]
    B --> G[注册class]
    
    K --> J[获取DomTree并建立层级关系]
    J --> I[开始绘制]
    I --> M[绘制图层]
    I --> O[储存事件]
    P[用户触发后] --> C
    M --> ST[视图绘制]
    M --> LZ[粒子绘制]
    LZ --> CCLZ[粒子储存]
    LZ --> HZLZ[粒子绘制]
    C --> O
    ST --> JX[矩形绘制]
    JX --> CJ[图片处理]
    JX --> BG[背景处理]
    JX --> CJJ[裁剪]
    ST --> SF[缩放]
    ST --> XZ[旋转]
    ST --> FONT[文字绘制]
    FONT --> MH[多行文字]
    FONT --> HH[文字换行]
    FONT --> OC[宽度计算]
    FONT --> OH[超出展示]
    FONT --> WW[文字渲染等等]

```
<section style="color:green;font-size: 16px;margin-bottom: 0px;">2、canvas交互</section>

```
graph TD
    A[交互] --> B[事件]
    B --> BS[touchstart]
    B --> BM[touchmove]
    B --> BE[touchend]
    B --> BC[click]
    A --> C[操作DOM]
    C --> CE[通过class获取dom]
    C --> CF[0级DOM事件]
    
```
<section style="color:green;font-size: 16px;margin-bottom: 0px;">3、canvas工具</section>

```
graph TD
    A[工具] -->|解析字符串| B[analysisString]
    A -->|计算文字宽度| BS[computedText]
    A -->|下载单张图片| BM[createdImg]
    A -->|canvas生成图片| BE[createdImageUrl]
    A -->|下载多张图片并返回进度| BC[downloadFile]
    A -->|判断是否为纯对象| CH[isPlainObject]
    A -->|获取纯对象的所有key| CE[objectkeys]
    
```


### api

<section style="color:blue;font-size: 16px;margin-bottom: 0px;">1、init</section>
 
name|type|描述
:- | :- | :- | :- | :- 
canvas||
ctx||
config|DOM[] |配置
gain|number| canvas放大倍数
mounted|func| 编译之后，canvas绘制完成调用
created|func| 在创建之初，编译之前

<section style="color:blue;font-size: 16px;margin-bottom: 0px;">2、public</section>

name|type|描述
:- | :- | :- | :- | :- 
startTime | number| touchstart触发时间
endTime |number| touchend触发时间
startClientX |number| touchstart触发x坐标
startClientY |number| touchstart触发y坐标
endClientX |number| touchsend触发x坐标
endClientY |number| touchsend触发y坐标
moveClientX |number| touchmove触发x坐标
moveClientY |number| touchmove触发y坐标
speed |{x:number,y:number}| 滑动速度对象 x方向速度 y方向速度 单位1000px/s
$apply()|func:viod|更新画布，会触发编译
draw()|func:viod|更新画布，不会触发编译
getClassList|get func: {className: string[]}| 获取class


<section style="color:blue;font-size: 16px;margin-bottom: 0px;">3、事件 e</section>

包括返回所有DOM数据以外，额外返回

name|type|描述
:- | :- | :- | :- | :- 
e.self | object| 得到此元素本身
e.parent | object| 得到此元素父级
e.index | number| 属于第几层级元素

<section style="color:blue;font-size: 16px;margin-bottom: 0px;">3、布局</section>

name|type|描述|是否可继承
:- | :- | :- | :- | :- 
click|func| 点击事件
touchmove|func| touchmove事件
touchstart|func| touchstart事件
touchend|func| touchend事件
children|DOM[]|子集 
w|number|宽 |是
h|number|高 
x|number|x坐标 （在子元素中使用会被视为绝对定位，以屏幕左上角开始计算）
y|number|y坐标 （在子元素中使用会被视为绝对定位，以屏幕左上角开始计算）
fontSize|number|字体大小| 是
color|string|字体颜色 |是
opcity|number|透明度 |是
zIndex|number|层级
whiteSpace|string opt['nowrap'] | 父级宽度可被撑开，整行展示
class|string|className
backgroundImage|HTMLCanvasElement & string|背景图片
maxLine|number|文字最大展示行数
scale|{x:number,y:number}|缩放
rotate|number & string|旋转(单位deg) 
particle|{size:number,d:number}|粒子 size（粒子大小）d（粒子间距）
border|string|边框（如1rpx solid red 或者 1rpx dashed:10:3 red）10为线宽3为间距，可不写默认10：3
lineHeight|number|行高
text|string|文字（有这个就会绘制文字）
textAlign|string| start默认 center居中 end
backgroundColor|string|背景颜色
backgroundSize|{w:number,h:number}|背景尺寸
backgroundPosition|{x: number,y:number}| 背景位置，从元素左上角计算
paddingLeft|number|内边距
paddingTop|number|内边距
marginLeft|number|外边距 （只从父级左上角计算，与兄弟元素无关）
marginTop|number|外边距 （只从父级左上角计算，与兄弟元素无关）
canLRSlide|boolean|可以左右滑动 默认不可以


