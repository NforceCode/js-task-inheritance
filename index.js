'use strict';
// Реализовать функцию конструктор MyArray.

// Реализовать следующие методы функции конструктора:
// MyArray.isMyArray(arg);  // подсказка: instanceof

function MyArray() {

  this.length = 0;
  this.isMyArray = function (arg) {
    return this.prototype === arg.prototype;
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

    for(let i=0; i< arguments.length; i++) {
      this[this.length++] = this[i];
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
    // TODO
  }
}

MyArray.prototype = new MyArrayPrototype();

// MyArray.prototype.reverse();

// advanced
// MyArray.prototype.forEach();
// MyArray.prototype.map();

const arr = new MyArray();