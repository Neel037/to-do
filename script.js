document.addEventListener("DOMContentLoaded", function() {
    const todoList = document.getElementById("todo-list");
    const addBtn = document.getElementById("add-btn");

    const taskNameInput = document.getElementById("task-name");
    const taskDateInput = document.getElementById("task-date");
    const taskTimeInput = document.getElementById("task-time");

    const tasks = [];

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.className = "todo-item";
            taskElement.innerHTML = `
                <div>
                    <strong>${task.name}</strong><br>
                    <small>${task.time}</small>
                </div>
                <button class="btn-delete" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(taskElement);
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }

    addBtn.addEventListener("click", () => {
        const name = taskNameInput.value.trim();
        const date = taskDateInput.value;
        const time = taskTimeInput.value;

        if (name && date && time) {
            const dateTime = new Date(`${date}T${time}`);
            const formattedDate = dateTime.toLocaleDateString('en-GB');
            const formattedTime = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            tasks.push({ name, time: `${formattedDate} ${formattedTime}` });
            renderTasks();

            taskNameInput.value = '';
            taskDateInput.value = '';
            taskTimeInput.value = '';
        } else {
            alert("Please fill in all fields");
        }
    });

    renderTasks();
});


  