### let和cont
#### 1、let命令
*   ES6新增命令，只在 `代码块中有效`
```
{
  let a = 10;
  var b = 1;
}
// let声明的a变量，在代码块外部访问无效。
// for(let i = 0; i < arr.length; i++){}  for循环也能构成一个`代码块`

// 代码块，实际上构成一个代码块作用域，而for循环中的每一次，执行，都会构成一个块级作用域
// 而程序运行时，会以它定义的地方，做为作用域链的顶端。
let array = [];
for(let i = 0; i < 10; i++) {
  array[i] = function () {
    console.log(i);
  }
}
array[5]();  // 5，而不是10
```

*   不存在变量提升[凡是在声明之前就使用这些命令-均会报错]
```
// 不像var一样，let不存在变量提升：就是说，必须先声明，才能调用，也就是说`最安全的typeof`也不能放心用了
console.log(foo); // ReferenceError
let foo = 2;

// ES6明确规定：如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域--[不受外部影响]
// [暂时性死区]：在let声明tmp之前，代码快中，均为暂时死区
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}   
=======================================
暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，
才可以获取和使用该变量。而在es5语法中，可以使用，但是undefined
```

*   不允许重复声明
```
// 无论是var 重复，还是let重复
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```

#### 2、块级作用域
*   ES5中只有全局作用域和函数作用域，ES6新增块级作用域
*   没有块级作用域，代码不合理的场景
```
// 第一种场景，由于变量提升内层变量可能会覆盖外层变量。
// 第二种场景，用来计数的循环变量泄露为全局变量。
// 经典例子
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5 [外层代码，不受内层代码影响]
}
// 经典例子：可以随意嵌套，内层不影响外层
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World';}
}}}};

```
*   如果要引用内部定义的变量：【将变量（函数）定义和赋值分开来实现】
```
// 块级作用域外部，无法调用块级作用域内部定义的函数。如果确实需要调用，就要像下面这样处理。
let f;
let ff;
{
  let a = 'secret';
  f = function () {
    return a;
  }
  ff = 'runzhi';
}
console.log(f()) // "secret"
console.log(ff);
```

#### 3、const命令
*  一经赋值，就不能在改变，重新赋值，默默失败

*  与let命令相同：只在声明所在的块级作用域内有效
*  与let命令相同：不能变量提升，存在暂时性死区
*  与let命令相同：不可重复声明
*  const命令只是【指向变量所在的地址】，所以将一个对象声明为常量必须非常小心
```
const foo = {};
foo.prop = 123;

foo.prop
// 123

foo = {} // 不起作用
// 常量foo储存的是`一个地址`，这个地址指向`一个对象`。【不可变的只是这个地址】，即不能把foo指向另一个地址
// 但对象【本身是可变的】，所以依然可以为其添加新属性
const a = [];
a.push("Hello"); // 可执行
a.length = 0;    // 可执行
a = ["Dave"];    // 报错
```

*   如果要把一个对象，冻结，即：连属性也不能添加
```
// 只冻结对象，不冻结属性
Object.freeze(对象)

// 完全冻结
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

