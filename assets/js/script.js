var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Create a list item, classed appropriately as a button, with specific text content.
var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // VALIDATION. Check if input values are empty strings.
  if (!taskNameInput || !taskTypeInput) {
    alert("Please fill in the task form.");
    return false;
  }

  // RESET FORM. 
  formEl.reset();

  // Package up data as an object.
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // Send it as an argument to createTaskEl.
  createTaskEL(taskDataObj);

};

var createTaskEL = function (taskDataObj) {
  // Create a list item.
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Create div to hold task info and add it to the list item.
  var taskInfoEl = document.createElement("div");
  // Assign the appropriate class to said div.
  taskInfoEl.className = "task-info";
  // Add HTML content to div.
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);

  // Add entire list item to list. 
  tasksToDoEl.appendChild(listItemEl);
};

// Upon click, create the list item described above.
formEl.addEventListener("submit", taskFormHandler);

