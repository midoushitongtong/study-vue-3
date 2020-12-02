/**
 * 基本数据类型
 * boolean
 * number
 * string
 * undefined
 * null
 *
 * undefined 和 null 是所有类型的子类型
 */

// let b: boolean = true;
// b = null;

// const numArr: number[] = [1, 2, 3];
// numArr.push(1);

// function test() {
//   // 类类型不能分配至 any 数组类型
//   // const b: any[] = arguments;
// }

// 元祖
// const usr: [string, number] = ['1 ', 2];

// 用于约束 object
// interface Person {
//   // readonly 是用在属性上, const 使用在变量上
//   readonly id: number;
//   name: string;
//   age?: number;
// }

// const p: Person = {
//   id: 1,
//   name: '1',
//   age: 1,
// };

// error
// p.id = 1;

// 通过表达式的方式声明函数
// const test = (a: number, b: number): number => {
//   return a + b;
// };

// const test2: (a: number, b: number) => number = test;

// interface Test3 {
//   (a: number, b: number): number;
// }

// const test3: Test3 = test2;

// test(1, 2);
// test2(1, 2);
// test3(1, 2);

// 类型推论
// let string = '123'; // 推论为 string
// error
// string = 1;

// 联合类型
// let numOrStr: number | string;
// numOrStr = 1;

// function getLen(input: string | number): number {
//   // 类型断言, 告诉 typescript 我比你更了解这个属于什么类型
//   const str = input as string;
//   if (str.length) {
//     return str.length;
//   } else {
//     const number = input as number;
//     return number.toString().length;
//   }
// }

// 类型守卫
// function geLen2(input: string | number): number {
//   if (typeof input === 'string') {
//     return input.length;
//   } else {
//     return input.toString().length;
//   }
// }

// 类 class: 用于描述事物
// 对象: 类的示例
// 面对对象: 封装继承多态

// class Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }

//   run() {
//     console.log(this.name);
//   }
// }

// class Dog extends Animal {}

// class Cat extends Animal {
//   static test = 1;
// }

// new Dog('1').run();

// new Cat('1').run();

// class Test {
//   private test() {
//     console.log(1);
//   }
// }

// // error
// new Test().test();

// 类以及接口
// interface Radio {
//   switchRadio: (trigger: boolean) => void;
// }

// interface Run {
//   run: () => void;
// }

// interface Run2 extends Run {
//   run2: () => void;
// }

// class Test implements Radio {
//   switchRadio(trigger: boolean) {}
// }

// class Test2 implements Radio, Run2 {
//   switchRadio(trigger: boolean) {}

//   run() {}

//   run2() {}
// }

// 枚举, 定义一组常亮
// enum Direction {
//   Up = 'UP',
//   Down = 'DOWN',
//   Left = 'LEFT',
//   Right = 'RIGHT',
// }

// console.log(Direction.Up); // UP

// console.log(Direction.Down); // DOWN

// 常量枚举, 当值不需要是一个对象, 只需要固定的值, 就可以用常量枚举
// const enum Direction2 {
//   Up = 'UP',
//   Down = 'DOWN',
//   Left = 'LEFT',
//   Right = 'RIGHT',
// }

// 泛型
// const echo = <T>(arg: T): T => {
//   return arg;
// };

// const result: string = echo('1');

// function swap<T, U>(tuple: [T, U]): [U, T] {
//   return [tuple[1], tuple[0]];
// }

// console.log(swap([1, 2]));

// 泛型约束, 泛型虽然是什么值都能传入, 但有时候我们可能需要进行一些约束, 需要传入特定的值
// function test<
//   T extends {
//     length: number;
//   }
// >(arg: T): T {
//   console.log(arg.length);

//   return arg;
// }

// test([]);
// test('1');

// class Queue<T> {
//   private data: T[] = [];

//   push(item: T) {
//     return this.data.push(item);
//   }

//   pop(): T {
//     return this.data.shift();
//   }
// }

// const queue = new Queue<number>();
// queue.push(123);
// queue.push(3);
// console.log(queue.pop());

// interface KeyPar<T, U> {
//   key: T;
//   value: U;
// }

// let kp1: KeyPar<number, string> = {
//   key: 1,
//   value: '2',
// };

// let a: number[] = [1];
// // 上面也可以用泛型来表示
// let b: Array<number> = [2];

// // 类型别名
// type PlusType = (x: number, y: number) => number;
// let sum: PlusType = (x, y) => x + y;
// sum(1, 2);

// // 联合类型
// type StrOrNum = string | number;

// // 字面量类型
// type Q = 'UP' | 'DOWN';
// let a: Q = 'UP';

// interface T {
//   name: string;
// }

// // 交叉类型
// type T2 = T & {
//   age: number;
// };

// 类型声明
// jQuery('#foo');

// ts 内置类型
// const a: Array<number> = [1, 2];
// const d = new Date();

// document.body.addEventListener('click', () => {});

// 工具类型
// 将传入的类型都变为可选类型
// type Ud = {
//   name: string;
//   age: number;
// };

// const u: Partial<Ud> = {
//   name: '1',
//   age: 1,
// };

// // 将传入的类型忽略某个字段
// const u2: Omit<U, 'name'> = {
//   age: 1,
// };
