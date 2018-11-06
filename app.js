'use strict';

//the array contains all images file names
var imagesArray = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"]

function Product(name, src) {
  this.name = name;
  this.src = src;

  products.push(this); //the keys in 'this' (name and src) will be pushed into the products variable
  this.render()
}

var tracker = {
  products: [],
  totalClicks: 0,

  mainEl: document.getElementById('main-content'),

  getRandomIndex: function displayImage() {
    var randImage = Math.floor(Math.random() * 19);
    document.canvas.src = imagesArray[randImage];
  },
  getUniqueImages: function () {

  },
  renderImages: function () {

  },
  addClickTracker: function () {

  },
  clickHandler: function (event) {

  },
};


(function createProducts() {
