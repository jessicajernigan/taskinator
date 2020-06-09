var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Create a list item, classed appropriately as a button, with specific text content.
var createTaskHandler = function (event) {

  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // Create a list item.
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Create div to hold task info and add it to the list item.
  var taskInfoEl = document.createElement("div");
  // Assign the appropriate class to said div.
  taskInfoEl.className = "task-info";
  // Add HTML content to div.
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

  listItemEl.appendChild(taskInfoEl);

  // Add entire list item to list. 
  tasksToDoEl.appendChild(listItemEl);
};

// Upon click, create the list item described above.
formEl.addEventListener("submit", createTaskHandler);

