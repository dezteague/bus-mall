'use strict';

//global variables
var ctx = document.getElementById("myChart").getContext('2d');
var totalClicks = 0;// this counter will eventually stop at 25 clicks
var allProducts = []; //this array will hold all new instances of products which will be used later
var previouslyDisplayed = []; //this array will hold sets of three images which will later be used to make sure there are no duplicates immediately after a set

var firstImage = document.getElementById('first');
var secondImage = document.getElementById('second');
var thirdImage = document.getElementById('third');
var results = document.getElementById('results'); //this variable is a placeholder that will display voter results in html

//this constructor will produce name, image, votes, and views for each new product
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
new Product('boots', './img/boots.jpg', 'boots');
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
  //name is the associate id text that will later appear in results render for all products
  firstImage.alt = allProducts[firstRandom].name;
  secondImage.alt = allProducts[secondRandom].name;
  thirdImage.alt = allProducts[thirdRandom].name;

  //counter for the number of views for each product
  allProducts[firstRandom].views++;
  allProducts[secondRandom].views++;
  allProducts[secondRandom].views++;

  totalClicks++; //total clicks increments from 0 upwards to 25

  if (totalClicks > 25) { //once the number of clicks reaches 25, the listener stops
    firstImage.removeEventListener('click', handleImageClicks);
    secondImage.removeEventListener('click', handleImageClicks);
    thirdImage.removeEventListener('click', handleImageClicks);
    displayResults();
  }
}
function handleImageClicks(event) { //event handler is the action that takes place once there is a click
  randomImage();

  for (var i = 0; i < allProducts.length; i++) {//starting at index [0]; stopping at the length; increment by 1
    if (event.target.alt === allProducts[i].name) { //if the alt id matches the name
      allProducts[i].votes++; //count votes for each product
    }
  }
  //votes++ in the line above makes sure that votes are calculated before the second set of random images are called
  randomImage();
}
randomImage();
function displayResults() {// CREATE CHART comparing names (of all products) and # of votes (for all products)
  var names = [];
  for (var i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name); // push values of allProducts into the names array
  }
 
  var votes = [];
  for (var j = 0; j < allProducts.length; j++) {
    votes.push(allProducts[j].name); // push values of allProducts into the votes array
  }

  var chartConfig = {
    type: 'bar',
    data: {
      labels: names, //the name id for each product will be displayed on the graph
      datasets: [{
        label: 'Votes', //the label 'votes' will be displayed on the graph
        data: votes,
        backgroundColor: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
          '#790e08',
          '#7d443d',
          '#89a5bb',
          '#ab831b',
          '#ead83c',
          '#22d7a5',
          '#760567',
          '#52f6bf',
          '#30a702',
          '#534317',
          '#cf7e0b',
          '#3017ec',
          '#4f7c9a'
        ],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

return new Chart(ctx, chartConfig);
}

firstImage.addEventListener('click', handleImageClicks);
secondImage.addEventListener('click', handleImageClicks);
thirdImage.addEventListener('click', handleImageClicks)