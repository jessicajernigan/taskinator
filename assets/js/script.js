var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Create a list item, classed appropriately as a button, with specific text content.
var createTaskHandler = function (event) {

  event.preventDefault();

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};

// Upon click, create the list item described above.
formEl.addEventListener("submit", createTaskHandler);

