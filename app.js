'use strict';

//these variabes are what I want to be displayed in html
var totalClicks = 0;
var allProducts = []; //this array will hold all new instances of products which will be used later
var firstImage = document.getElementById('first');
var secondImage = document.getElementById('second');
var thirdImage = document.getElementById('third');
var results = document.getElementById('results'); //this variable is a placeholder that will display voter results in html

function Product(name, imagePath) {
  this.name = name; //name of the product
  this.imagePath = imagePath; //path to image file
  this.votes = 0; //counter for product votes
  this.views = 0; //counter for product views

  allProducts.push(this); //the keys in 'this' (name and imagePath) will be pushed into the products variable
}
//new product instantiates a new object for each image
//each product contains (name, imagePath)
new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('usb', './img/usb.gif');
new Product('water-can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');

function randomImage() { //this function generates a random image from the allProducts array
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);

  //.src is referrring to the anchor in html
  //.imagePath is the location of the image on file
  firstImage.src = allProducts[firstRandom].imagePath;
  secondImage.src = allProducts[secondRandom].imagePath;
  thirdImage.src = allProducts[thirdRandom].imagePath;

  totalClicks++; //total clicks increments from 0 upwards to 25

  if (totalClicks === 25) { //once the number of clicks reaches 25, the listener stops
    firstImage.removeEventListener('click', randomImage);
    secondImage.removeEventListener('click', randomImage);
    thirdImage.removeEventListener('click', randomImage);
    displayResults();
  }
}

randomImage();// call randomImages

function displayResults() {
  //use a for loop to iterate through the array:
  for (var i = 0; i < allProducts.length; i++) { //starting at index [0]; stopping at the length; increment by 1
    var listEl = document.createElement('li');
    listEl.textContent = allProducts[i].votes + ' votes for the ' + allProducts[i].name + ' and ' + allProducts[i].views + ' views ';
    results.appendChild(listEl);
  }
}

firstImage.addEventListener('click', randomImage);
secondImage.addEventListener('click', randomImage);
thirdImage.addEventListener('click', randomImage);