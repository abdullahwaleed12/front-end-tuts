// Setting Up Variable
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

// Focus on Input field
window.onload = function () {
  theInput.focus();
};

// adding the task

theAddButton.onclick = function () {
  if (theInput.value === "") {
    console.log("no Value");
    // Do here sweet alert [First Student Task];
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "You forgot to fill in the input!",
      confirmButtonText: "OK",
    });
  } else {
    let noTaskMsg = document.querySelector(".no-tasks-message");
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      noTaskMsg.remove();
    }

    // Create the main span
    let mainSpan = document.createElement("span");

    // create delete button
    let deleteElement = document.createElement("span");

    // create text to the mainSpan
    let text = document.createTextNode(theInput.value);

    // create text to the deleteElement
    let deleteText = document.createTextNode("Delete");

    // Add text to span
    mainSpan.appendChild(text);

    // add class to span
    mainSpan.classList = "task-box";

    // Add text to delete button
    deleteElement.appendChild(deleteText);

    // add class to Delete button
    deleteElement.classList = "delete";

    // add Delete button to main span
    mainSpan.appendChild(deleteElement);

    // Add the Task to the container
    tasksContainer.appendChild(mainSpan);

    // Fire here to see to the user that the task added
    Swal.fire({
      icon: "success",
      title: "Task added",
      text: `You entered: ${theInput.value}`,
    });

    // Empty the inputValue
    theInput.value = "";

    theInput.focus();
    calculateTasks();
  }
};

document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.className == "delete") {
    // Remove parent Element
    e.target.parentNode.remove();

    if (tasksContainer.childElementCount == 0) {
      noTasksMsg();
    }
  }

  // Finish Task
  if (e.target.classList.contains("task-box")) {
    // toggle class "finished"
    e.target.classList.toggle("finished");
  }
  calculateTasks();
});

function noTasksMsg() {
  // Create the Msg Span
  let msgSpan = document.createElement("span");

  // Create the task Msg
  let msgText = document.createTextNode("No Tasks to show");

  // Add text to Msg Span Element
  msgSpan.appendChild(msgText);

  // Add Class to msg span
  msgSpan.className = "no-tasks-message";

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);
}

function calculateTasks() {
  // Calculate Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate finished Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
