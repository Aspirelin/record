'use strict'

/*
* let命令
*/

// let 代码块中有效，代码块中var声明的为·全局变量·
{
  let a = 1;
  var b = 2;
}
console.log(typeof a);
console.log(typeof b);

// for循环，构成n个代码块，代码块之外，i是undefined
for(let i = 0; i < 5 ; i++) {
  console.log(i);
}
console.log(typeof i);

// 代码块，实际上构成一个代码块作用域，而for循环中的每一次，执行，都会构成一个块级作用域
// 而程序运行时，会以它定义的地方，做为作用域链的顶端。

let array = [];
for(let i = 0; i < 10; i++) {
  array[i] = function () {
    console.log(i);
  }
}
array[5]();  // 5，而不是10

// 随意嵌套，外层代码，不受内层影响
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}


/*
* 块级作用域
*/

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



/*
* const 命令
*/

// 彻底冻结对象

const constObj = {
  name: 'runzhi',
  company: 'ant service'
}

let constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, value) => {
    if (typeof obj[key] === 'object') {
      constantize( obj[key] );
    }
  });
}
constObj.name = 'ronglin';
console.log(constObj.name);
































