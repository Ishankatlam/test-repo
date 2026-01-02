document.addEventListener("DOMContentLoaded", () => {

    console.log("JS connected");

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    addTaskBtn.onclick = addTask;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = task.text;

            if (task.completed) span.classList.add("completed");

            span.onclick = () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";

            deleteBtn.onclick = () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            };

            li.append(span, deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }

    renderTasks();
});
