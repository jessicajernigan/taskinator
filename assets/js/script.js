var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

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

  // Package up user input & selection as an object.
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // Send said object as an ARGUMENT to createTaskEl.
  createTaskEL(taskDataObj);
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

