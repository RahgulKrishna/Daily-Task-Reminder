// Get elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return; // Ignore empty input

    // Create task item
    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTask(taskText);
    taskInput.value = ""; // Clear input
}

// Create task element with delete and complete options
function createTaskElement(taskText) {
    const li = document.createElement("li");

    // Add task text
    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Complete task on click
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
        deleteTask(li, taskText);
    };
    li.appendChild(deleteBtn);

    return li;
}

// Save task to Local Storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
    });
}

// Delete task from list and Local Storage
function deleteTask(taskElement, taskText) {
    taskElement.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
