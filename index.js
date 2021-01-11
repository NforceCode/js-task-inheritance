'use strict';
// Реализовать функцию конструктор MyArray.

// Реализовать следующие методы функции конструктора:
// MyArray.isMyArray(arg);  // подсказка: instanceof

function MyArray() {
  this.length = 0;
  MyArray.isMyArray = function isMyArray(arg) {
    return arg instanceof MyArray;
  };

  for (let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
}

// Реализовать прототип для создаваемых коллекций, со следующими методами:
// MyArray.prototype.push();
// MyArray.prototype.pop(); // tip: delete
// MyArray.prototype.unshift();
// MyArray.prototype.shift();
// MyArray.prototype.concat();
// MyArray.prototype.reverse();

function MyArrayPrototype() {
  this.push = function () {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  };

  this.pop = function () {
    if (this.length === 0) {
      return;
    }
    const lastItem = this[this.length - 1];
    delete this[--this.length];
    return lastItem;
  };

  this.unshift = function () {

    for (let i = this.length - 1; i >= 0; i--) {
      this[i + arguments.length] = this[i];
    }

    this.length += arguments.length;

    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    return this.length;
  };

  this.shift = function () {
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

  this.concat = function () {
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

  this.reverse = function () {
    for (let i = 0; i < Math.ceil(this.length / 2); i++) {
      const savedItem = this[i];
      const deltaI = this.length - 1 - i;
      this[i] = this[deltaI];
      this[deltaI] = savedItem;
    }

    return this;
  };

  this.forEach = function forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };

  this.map = function map(callback) {
    const newArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArr.push(callback(this[i], i, this));
    }

    return newArr;
  };

  this.flat = function (depth = 1) {
    const newArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (MyArray.isMyArray(this[i]) && depth > 0) {
        const nestedArray = this[i].flat(depth - 1);
        for (let j = 0; j < nestedArray.length; j++) {
          newArray.push(nestedArray[j]);
        }
      } else if(typeof this[i] !== 'undefined'){
        newArray.push(this[i]);
      }
    }

    return newArray;
  };
}

MyArray.prototype = new MyArrayPrototype();

// advanced
// MyArray.prototype.forEach();
// MyArray.prototype.map();

const arr = new MyArray('ACCESS GRANTED', '0xABCDEF123456789', 'lorem999');
const arr1 = new MyArray(1, 2, 3);
const arr2 = new MyArray(true, false, true);

const nested1 = new MyArray(7, 8, 9);
const nested2 = new MyArray(4, 5, 6, nested1);
const nest = new MyArray(1, 2, 3, nested2);

const withempty = new MyArray(1,2,3,4,5);
const withemptyArray = [1,2,3,4,5, undefined];
delete withempty[2];
delete withemptyArray[2];

