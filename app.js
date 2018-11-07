'use strict';

var totalClicks = 0;// this counter will eventually stop at 25 clicks
var allProducts = []; //this array will hold all new instances of products which will be used later
var previouslyDisplayed = []; //this array will hold sets of three images which will later be used to make sure there are no duplicates immediately after a set

var firstImage = document.getElementById('first');
var secondImage = document.getElementById('second');
var thirdImage = document.getElementById('third');
var results = document.getElementById('results'); //this variable is a placeholder that will display voter results in html

//this constructor will produce name, image, votes, and views for each new product
function Product(name, imagePath, altText) {
  this.name = name; //name of the product
  this.imagePath = imagePath; //path to image file
  this.altText = altText; //alternate text identifier
  this.votes = 0; //counter for product votes
  this.views = 0; //counter for product views

  allProducts.push(this); //the keys in 'this' (name and imagePath) will be pushed into the products variable
}
//new product instantiates a new object for each image
//each product contains (name, imagePath)
new Product('bag', './img/bag.jpg', 'bag');
new Product('banana', './img/banana.jpg', 'banana');
new Product('bathroom', './img/bathroom.jpg', 'bathroom');
new Product('boots', './img/boots.jpg', 'boots');
new Product('breakfast', './img/breakfast.jpg', 'breakfast');
new Product('bubblegum', './img/bubblegum.jpg', 'bubblegum');
new Product('chair', './img/chair.jpg', 'chair');
new Product('cthulhu', './img/cthulhu.jpg', 'cthulhu');
new Product('dog-duck', './img/dog-duck.jpg', 'dog-duck');
new Product('dragon', './img/dragon.jpg', 'dragon');
new Product('pen', './img/pen.jpg', 'pen');
new Product('pet-sweep', './img/pet-sweep.jpg', 'pet-sweep');
new Product('scissors', './img/scissors.jpg', 'scissors');
new Product('shark', './img/shark.jpg', 'shark');
new Product('sweep', './img/sweep.png', 'sweep');
new Product('tauntaun', './img/tauntaun.jpg', 'tauntaun');
new Product('unicorn', './img/unicorn.jpg', 'unicorn');
new Product('usb', './img/usb.gif', 'usb');
new Product('water-can', './img/water-can.jpg', 'water-can');
new Product('wine-glass', './img/wine-glass.jpg', 'wine-glass');

function randomImage() { //this function generates a random image from the allProducts array
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);

  //purpose of the while loop is to prevent duplicates within the initial 3 images
  //the whhile loop also prevents immediate repetition from set to set
  while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom //no dupes in 3 images
    || previouslyDisplayed.includes(firstRandom) || previouslyDisplayed.includes(secondRandom) || previouslyDisplayed.includes(thirdRandom))//no dupes from set to set
  {
    firstRandom = Math.floor(Math.random() * allProducts.length);
    secondRandom = Math.floor(Math.random() * allProducts.length);
    thirdRandom = Math.floor(Math.random() * allProducts.length);
  }
  //the "previously displayed" array has three index positions 0,1,and 2 which are equivalent to the randomly generated images.
  previouslyDisplayed[0] = firstRandom;
  previouslyDisplayed[1] = secondRandom;
  previouslyDisplayed[2] = thirdImage;

  //.src is referrring to the anchor in html
  //.imagePath is the location of the image on file
  firstImage.src = allProducts[firstRandom].imagePath;
  secondImage.src = allProducts[secondRandom].imagePath;
  thirdImage.src = allProducts[thirdRandom].imagePath;

  //alt. refers to the alt tag, anchored in html
  //alt.text is the associate id text that will later appear in results render for all products
  firstImage.alt = allProducts[firstRandom].altText;
  secondImage.alt = allProducts[secondRandom].altText;
  thirdImage.alt = allProducts[thirdRandom].altText;

  //counter for the number of views for each product
  allProducts[firstRandom].views++;
  allProducts[secondRandom].views++;
  allProducts[secondRandom].views++;

  totalClicks++; //total clicks increments from 0 upwards to 25

  if (totalClicks === 25) { //once the number of clicks reaches 25, the listener stops
    firstImage.removeEventListener('click', handleImageClicks);
    secondImage.removeEventListener('click', handleImageClicks);
    thirdImage.removeEventListener('click', handleImageClicks);
    displayResults();
  }
}
function handleImageClicks(event) {
  randomImage();

  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].votes++; //counting views for each product
    }
  }
}

function displayResults() {
  //use a for loop to iterate through the array:
  for (var i = 0; i < allProducts.length; i++) { //starting at index [0]; stopping at the length; increment by 1
    var listEl = document.createElement('li');
    listEl.textContent = allProducts[i].votes + ' votes for the ' + allProducts[i].name + ' and ' + allProducts[i].views + ' views ';
    results.appendChild(listEl);
  }
}
randomImage();// call randomImages

//
firstImage.addEventListener('click', handleImageClicks);
secondImage.addEventListener('click', handleImageClicks);
thirdImage.addEventListener('click', handleImageClicks);