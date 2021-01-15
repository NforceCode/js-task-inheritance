'use strict';
// Реализовать функцию конструктор MyArray.

// Реализовать следующие методы функции конструктора:
// MyArray.isMyArray(arg);  // подсказка: instanceof

class MyArray {
  constructor(...args) {
    this.length = 0;
    for(let i = 0; i<args.length; i++){
      this.push(args[i]);
    }
  }

  static isMyArray (arg) {
    return arg instanceof MyArray;
  }

  push () {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  };

  pop() {
    if (this.length === 0) {
      return;
    }
    const lastItem = this[this.length - 1];
    delete this[--this.length];
    return lastItem;
  };

  unshift() {

    for (let i = this.length - 1; i >= 0; i--) {
      this[i + arguments.length] = this[i];
    }

    this.length += arguments.length;

    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    return this.length;
  };

  shift() {
    if (this.length === 0) {
      return;
    }

    const removedItem = this[0];

    if (this.length === 1) {
      delete this[0];
    } else {
      for (let i = 0; i < this.length - 1; i++) {
        this[i] = this[i + 1];
      }
      delete this[this.length - 1];
    }

    this.length--;
    return removedItem;
  };

  concat () {
    const newArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArray.push(this[i]);
    }

    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] && MyArray.isMyArray(arguments[i])) {
        for (let j = 0; j < arguments[i].length; j++) {
          newArray.push(arguments[i][j]);
        }
      } else {
        newArray.push(arguments[i]);
      }
    }

    return newArray;
  };

  reverse() {
    for (let i = 0; i < Math.ceil(this.length / 2); i++) {
      const savedItem = this[i];
      const deltaI = this.length - 1 - i;
      this[i] = this[deltaI];
      this[deltaI] = savedItem;
    }

    return this;
  };

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };

  map(callback) {
    const newArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArr[i] = callback(this[i], i, this);
    }

    return newArr;
  };

  flat(depth = 1) {
    const newArray = new MyArray();

    this.forEach((item)=> {
      if(MyArray.isMyArray(item) && depth > 0) {
        const nestedArray = item.flat(depth - 1);
        for(let i = 0; i< nestedArray.length; i++) {
          newArray.push(nestedArray[i]);
        }
      } else if(typeof item !== 'undefined') {
        newArray.push(item);
      }
    });

    return newArray;
  };
}



// Реализовать прототип для создаваемых коллекций, со следующими методами:
// MyArray.prototype.push();
// MyArray.prototype.pop(); // tip: delete
// MyArray.prototype.unshift();
// MyArray.prototype.shift();
// MyArray.prototype.concat();
// MyArray.prototype.reverse();

// advanced
// MyArray.prototype.forEach();
// MyArray.prototype.map();

const arr = new MyArray('ACCESS GRANTED', '0xABCDEF123456789', 'lorem999');
const arr1 = new MyArray(1, 2, 3);
const arr2 = new MyArray(true, false, true);

const nested1 = new MyArray(7, 8, 9);
const nested2 = new MyArray(4, 5, 6, nested1);
const nest = new MyArray(1, 2, 3, nested2);


