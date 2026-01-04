document.addEventListener("DOMContentLoaded", () => {
    console.log("JS connected");

    // =====================
    // DOM ELEMENTS
    // =====================
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // =====================
    // STATE
    // =====================
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // =====================
    // EVENT LISTENERS
    // =====================
    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    taskList.addEventListener("click", handleTaskActions);

    // =====================
    // FUNCTIONS
    // =====================

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.dataset.index = index;

            const span = document.createElement("span");
            span.textContent = task.text;
            span.className = task.completed ? "completed" : "";

            const editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.className = "edit-btn";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.className = "delete-btn";

            li.append(span, editBtn, deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;

        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }

    function handleTaskActions(e) {
        const li = e.target.closest("li");
        if (!li) return;

        const index = li.dataset.index;

        // Toggle completion
        if (e.target.tagName === "SPAN") {
            tasks[index].completed = !tasks[index].completed;
        }

        // Edit task
        if (e.target.classList.contains("edit-btn")) {
            const newText = prompt("Edit task:", tasks[index].text);
            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
            }
        }

        // Delete task
        if (e.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
        }

        saveTasks();
        renderTasks();
    }

    // Initial render
    renderTasks();
});

