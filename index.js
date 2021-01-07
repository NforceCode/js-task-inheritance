'use strict';
// Реализовать функцию конструктор MyArray.

// Реализовать следующие методы функции конструктора:
// MyArray.isMyArray(arg);  // подсказка: instanceof

function MyArray() {

  this.length = 0;
  this.isMyArray = function isMyArray(arg = this) {
    return MyArray.prototype === arg.__proto__;
  }

  for(let i = 0; i < arguments.length; i++) {
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
  }

  this.pop = function () {
    if (this.length === 0) {
      return;
    }
    const lastItem = this[this.length - 1];
    delete this[--this.length]
    return lastItem;
  }

  this.unshift = function () {

    const startingLength = this.length - 1;

    for (let i = startingLength; i >= 0; i--) {
      this[i + arguments.length] = this[i];
    }

    this.length += arguments.length;

    for(let i=0; i< arguments.length; i++) {
      this[i] = arguments[i];
    }
    return this.length;
  }

  this.shift = function () {

    if (this.length === 0) {
      return;
    } 

    const removedItem = this[0];

    
    
    if (this.length === 1) {
      delete this[0];
    } else {      
      for (let i=0; i < this.length - 1; i++) {
        this[i] = this[i + 1];        
      }
      delete this[this.length - 1];
    }

    this.length--;
    return removedItem;
  }

  this.concat = function () {
    
    const newArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArray.push(this[i]);
    }

    for (let i = 0; i < arguments.length; i++) {

      if(arguments[i] && newArray.isMyArray(arguments[i])) {

          for(let j = 0; j < arguments[i].length; j++) {
              newArray.push(arguments[i][j]);
          }
         
      } else {
        newArray.push(arguments[i]);
      }

    }

    return newArray;
  }

  this.reverse = function () {

    // Цикл заменяет первый и последний элемент в массиве потом второй и предпоследний и тд. 
    // В массиве с нечетным количеством элементов он заменит средний элемент сам собой в последней итерации
    for (let i = 0; i < Math.ceil(this.length / 2); i++) {

      const savedItem = this[i];
      const deltaI = this.length - 1 - i;
      this[i] = this[deltaI];
      this[deltaI] = savedItem;

    }

    return this;
  }

  this.forEach = function forEach (callback) {

    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  }

  this.map = function map (callback) {

    const newArr = new MyArray();

    for(let i =0; i< this.length; i++) {
      newArr[i] = callback(this[i], i, this);
    }

    return newArr;
  }

  this.flat = function (depth = 1, targetArray = this) {
    const newArray = new MyArray();

    for(let i = 0; i < targetArray.length; i++) {
      // 1 уровень вложенности
      if(targetArray.isMyArray(targetArray[i]) && depth > 0) {
        const nestedArray = targetArray.flat(depth -1 , targetArray[i]);
        for(let j = 0;j < nestedArray.length; j++){
          newArray.push(nestedArray[j]);
        }
      }
      else {
        newArray.push(targetArray[i]);
      }
    }

    return newArray;
  }
}

MyArray.prototype = new MyArrayPrototype();



// advanced
// MyArray.prototype.forEach();
// MyArray.prototype.map();

const arr = new MyArray('ACCESS GRANTED', '0xABCDEF123456789', 'lorem999');
const arr1 = new MyArray(1, 2, 3);
const arr2 = new MyArray(true, false, true);

const nested1 = new MyArray(7, 8, 9);
const nested2 = new MyArray(4, 5, 6 , nested1);
const nest = new MyArray(1, 2, 3, nested2);