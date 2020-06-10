var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");



// Function to:
// • Capture the text entry and dropdown option selected
// • Confirm both are valid 
// • Couple the inputs into a single variable 
// • Send the coupled input variable to the 'createTaskEl' function
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

  var isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    createTaskEl(taskDataObj);
  }
};


var completeEditTask = function (taskName, taskType, taskId) {
  console.log(taskName, taskType, taskId);
};


// Function to:
// • Create a list item 
// • Create the list item's style elements (id, class)
// • Generate a unique 'data-task-id'
// • Create the 'div' and add HTML content (using innerHTML)
// • Add list item to <ul> 

var createTaskEL = function (taskDataObj) {
  // Create a list item.
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Add task 'id' as a custom attribute.
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // Create div to hold task info and add it to the list item.
  var taskInfoEl = document.createElement("div");
  // Assign the appropriate class to said div.
  taskInfoEl.className = "task-info";
  // Add HTML content to div.
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // Add entire list item to list. 
  tasksToDoEl.appendChild(listItemEl);

  // Increase the task counter for next unique 'id'.
  taskIdCounter++;
};





// Function to dynamically create form elements.
var createTaskActions = function (taskId) {
  // Create a 'div' to house the dynamically created elements within each task.
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // Create the EDIT button.
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit"; // Add text to the button.
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId); // Set the unique 'id' (generated above).

  // Add the EDIT button and content to the dedicated 'div'.
  actionContainerEl.appendChild(editButtonEl);

  // Create the DELETE button.
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete"; // Add text to the button.
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId); // Set the unique 'id' (generated above).

  // Add the DELETE button and content to the dedicated 'div'.
  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  // Group all dropdown options into an array for concision.
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // Create an option element.
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // // // // FOR LOOP COMPONENT REFRESHER // //  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // var i = 0 defines an initial counter, or iterator, variable
    // i < statusChoices.length keeps the for loop running by checking the iterator against the number of items in the array (length being the property that returns the number of items)
    // i++ increments the counter by one after each loop iteration
    // statusChoices[i] returns the value of the array at the given index (e.g., when i = 0, or statusChoices[0], we get the first item)
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // Append to SELECT.
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
}

// Upon click, create the list item described above.
formEl.addEventListener("submit", taskFormHandler);




// Function to "listen" for user clicks on EDIT and DELETE buttons.
var taskButtonHandler = function (event) {
  // Get target element from event.
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) { // If the "click" event targeted an element containing the class 'edit-btn'...
    var taskId = targetEl.getAttribute("data-task-id"); // ...retrieve the data-task-id for that task element...
    editTask(taskId); // ...and then send that taskId as an argument to the 'editTask' function.
  }
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) { // If the "click" event targeted an element containing the class 'delete-btn'...
    var taskId = targetEl.getAttribute("data-task-id"); // ...retrieve the data-task-id for that task element...
    deleteTask(taskId); // ...and then send that taskId as an argument to the 'deleteTask' function.
  }
};

// Function to EDIT a task.
var editTask = function (taskId) {
  // Get task list item element.
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // Get content from task 'name' and 'type'.
  var taskName = taskSelected.querySelector("h3.task-name").textContent; // Use the 'querySelector' method within the 'taskSelected' DOM element (as opposed to the 'document' itself.)
  var taskType = taskSelected.querySelector("span.task-type").textContent;  // Use the 'querySelector' method within the 'taskSelected' DOM element (as opposed to the 'document' itself.)
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task"; // Make it clear that the form is now in "edit mode" by updating the text of the submit button.

  formEl.setAttribute("data-task-id", taskId);
}

// Function to DELETE a task.
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}


pageContentEl.addEventListener("click", taskButtonHandler);

