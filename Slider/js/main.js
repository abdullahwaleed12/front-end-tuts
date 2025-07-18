// Get Slider Items | Array.form [ES6 Feature]
var sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);

// Get number of Slides
var slidesCount = sliderImages.length;

// Set Current Slide
let currentSlide = 1;

// Slide Number Element
var slideNumberElement = document.getElementById("slider-number");

// Previous and Next Buttons

var nextButtons = document.getElementById("next");
var prevButtons = document.getElementById("prev");

// Handle click on Previous and Next buttons
nextButtons.onclick = nextSlide;
prevButtons.onclick = prevSlide;

// Create The main UL element
var paginationElement = document.createElement("ul");

// Set ID on Created UL element
paginationElement.setAttribute("id", "pagination-ul");

// Create List Items Based On Slides Count
for (let i = 1; i <= slidesCount; i++) {
  // Create Li
  var paginationItem = document.createElement("li");
  // Set Custom Attribute
  paginationItem.setAttribute("data-index", i);
  // Set Item content
  paginationItem.appendChild(document.createTextNode(i));
  // Append items to the Ul mian list
  paginationElement.appendChild(paginationItem);
}

document.getElementById("indicators").appendChild(paginationElement);

// Get The New Created UL
var paginationCreatedUl = document.getElementById("pagination-ul");

// Get Slider Items | Array.form [ES6 Feature]
var paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

for (var i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}

// Triager the checker function
theChecker();
// Next slide function
function nextSlide() {
  if (nextButtons.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
}

// Previous slide function
function prevSlide() {
  if (prevButtons.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}

// Create the Checker Function

function theChecker() {
  // Set the slide Number
  slideNumberElement.textContent =
    "Slide #" + currentSlide + " of " + slidesCount;
  removeAllActive();
  // set Active class on Current slide
  sliderImages[currentSlide - 1].classList.add("active");

  paginationCreatedUl.children[currentSlide - 1].classList.add("active");

  // check if the current slide is the first one
  if (currentSlide == 1) {
    prevButtons.classList.add("disabled");
  } else {
    prevButtons.classList.remove("disabled");
  }
  // check if the current slide is the latest one
  if (currentSlide == slidesCount) {
    nextButtons.classList.add("disabled");
  } else {
    nextButtons.classList.remove("disabled");
  }
}

function removeAllActive() {
  // Loop Through Images
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });

  // Loop Through Pagination Bullets
  paginationBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}
