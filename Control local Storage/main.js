// Setting Variables
let allSpans = document.querySelectorAll(".buttons span");
let results = document.querySelector(".results > span");
let theInput = document.getElementById("the-input");
let keyValue = document.querySelector(".key-value");

allSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-item")) {
      checkItem();
    }

    if (e.target.classList.contains("add-item")) {
      addItem();
    }

    if (e.target.classList.contains("delete-item")) {
      deleteItem();
    }

    if (e.target.classList.contains("show-items")) {
      showItems();
    }
  });
});

function showMsg() {
  results.innerHTML = "The input can not be empty";
}

function checkItem() {

  if (theInput.value !== "") {

    if (localStorage.getItem(theInput.value)) {

      results.innerHTML = `Found local Storage item called <span>${theInput.value}</span>`;

    } else {
      results.innerHTML = `Can Not Found local Storage item called <span>${theInput.value}</span>`;
    }

  } else {
    showMsg();
  }
}

function addItem() {
  if (theInput.value !== "") {
    localStorage.setItem(theInput.value, keyValue.value);
    results.innerHTML = `Local Storage item <span>${theInput.value}</span> Added`;
    theInput.value = "";
    keyValue.value = "";
  } else {
    showMsg();
  }
}

function deleteItem() {
  if (theInput.value !== "") {

    if (localStorage.getItem(theInput.value)) {

      localStorage.removeItem(theInput.value);
      results.innerHTML = `local Storage item called <span>${theInput.value}</span> Deleted`;

    } else {
      results.innerHTML = `Can Not Found local Storage item called <span>${theInput.value}</span>`;
    }
    
  } else {
    showMsg();
  }
}

function showItems() {
  if (localStorage.length){
    results.innerHTML = ""
    for(let [key , value] of Object.entries(localStorage)) {
      results.innerHTML += `<span class="keys"> ${key} : ${value} </span>`
    }
  }else{
    results.innerHTML = "Local Storage is Empty"
  }
}
