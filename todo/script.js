const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("list-container");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task");

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = "";
}

// render task
function renderTask(task) {
    const li = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    if (task.completed) li.classList.add("checked");

    checkbox.addEventListener("change", () => {
        li.classList.toggle("checked");
        updateStorage();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateStorage();
    });

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);
}

// localStorage helpers
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateStorage() {
    const tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
