var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = []; // Creates an empty array to which we can push task objects.



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
      type: taskTypeInput,
      status: "to do"
    }

    createTaskEl(taskDataObj);
  }

  saveTasks() // Add to localStorage.
};


var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");  // Find the matching task list item.

  taskSelected.querySelector("h3.task-name").textContent = taskName; // Set new NAME value.
  taskSelected.querySelector("span.task-type").textContent = taskType; // Set new TYPE value.

  // Loop through tasks array and task object with new content.
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };

  alert("Your task has been updated."); // Notify user that their update was successful.

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};


// Function to:
// • Create a list item 
// • Create the list item's style elements (id, class)
// • Generate a unique 'data-task-id'
// • Create the 'div' and add HTML content (using innerHTML)
// • Add list item to <ul> 

var createTaskEl = function (taskDataObj) {
  // Create a list item.
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Add task 'id' as a custom attribute.
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  listItemEl.setAttribute("draggable", "true");

  var taskInfoEl = document.createElement("div"); // Create div to hold task info and add it to the list item.
  taskInfoEl.className = "task-info"; // Assign the appropriate class to said div.
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // Add HTML content to div.

  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  taskIdCounter++; // Increase the task counter for next unique 'id'.
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
};

// Function to DELETE a task.
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;

  saveTasks() // Add to localStorage.
};


// Function to MOVE TASK TO A NEW COLUMN.
var taskStatusChangeHandler = function (event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  var statusValue = event.target.value.toLowerCase(); // Get the currently selected option's value and convert to lowercase
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); // find the parent task item element based on the id

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // Update tasks in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }

  saveTasks() // Add to localStorage.
};

// // // // D R A G   A N D   D R O P // // // // 

var dragTaskHandler = function (event) {
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text/plain", taskId);

  var getId = event.dataTransfer.getData("text/plain"); // Verify that our dataTransfer property stored the data-task-id attribute.
}

// Drag-and-Drop Context
// Because dataTransfer is a property of the drag event, we can access the data-task-id later in the drop event because both drag and drop are of the type DragEvent. In other words, since each action shares the same event type, we can access properties set during dragging later during dropping.

var dropZoneDragHandler = function (event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
    taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
  }
};

// DROP EVENT HANDLER PSEUDO CODE
// 1. Retrieve the original dragged task item from the dataTransfer property.
// 2. Reference the destination of the drop as a DOM element.
// 3. Update the task status of the task item to match the task list.
// 4. Append the dragged task item to the destination drop zone.

var dropTaskHandler = function (event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropZoneEl = event.target.closest(".task-list"); // Return the corresponding task list element of the drop zone.
  var statusType = dropZoneEl.id;
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']"); // Set status of task based on dropZone id
  if (statusType === "tasks-to-do") {
    statusSelectEl.selectedIndex = 0;
  }
  else if (statusType === "tasks-in-progress") {
    statusSelectEl.selectedIndex = 1;
  }
  else if (statusType === "tasks-completed") {
    statusSelectEl.selectedIndex = 2;
  }

  dropZoneEl.removeAttribute("style"); // Remove shading and outline styles.
  dropZoneEl.appendChild(draggableElement); // Append the draggableElement to its new parent element, dropZoneEl.

  // Loop through tasks array to find and update the updated task's status
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      tasks[i].status = statusSelectEl.value.toLowerCase();
    }
  }

  saveTasks() // Add to localStorage.

};

var dragLeaveHandler = function (event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    taskListEl.removeAttribute("style");
  }
};


var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


var loadTasks = function () {
  // Gets task items from localStorage
  // Converts tasks from the stringified format back into an array of objects
  // Iterates through tasks array and creates task elements on the page from it

}

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler); // Use this DOM element to reference the <main> element and delegate the dragstart listener to it.
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler); // Remove hover styles once task is dropped.


