let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;


// ===============================
// Add Task Function
// ===============================

function addTask(title, desc, column) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `;

    column.appendChild(div);

    div.addEventListener("drag", () => {
        dragElement = div;
    });

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        saveTasks();
    })

    return div;
}


// ===============================
// Save Tasks To Local Storage
// ===============================

function saveTasks() {

    columns.forEach(column => {

        const tasks = column.querySelectorAll(".task");

        tasksData[column.id] = Array.from(tasks).map(task => ({
            title: task.querySelector("h2").innerText,
            desc: task.querySelector("p").innerText
        }));

        const count = column.querySelector(".right");

        count.innerText = tasks.length;

    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasksData)
    );
}


// ===============================
// Load Tasks From Local Storage
// ===============================

if (localStorage.getItem("tasks")) {

    const data = JSON.parse(
        localStorage.getItem("tasks")
    );

    for (const columnId in data) {

        const column = document.querySelector(
            `#${columnId}`
        );

        data[columnId].forEach(task => {

            addTask(
                task.title,
                task.desc,
                column
            );

        });

    }

    saveTasks();
}


// ===============================
// Drag & Drop
// ===============================

function addDragEventsColumn(column) {

    column.addEventListener("dragenter", e => {

        e.preventDefault();

        column.classList.add("hoveer-over");

    });


    column.addEventListener("dragover", e => {

        e.preventDefault();

    });


    column.addEventListener("dragleave", () => {

        column.classList.remove("hoveer-over");

    });


    column.addEventListener("drop", e => {

        e.preventDefault();

        if (!dragElement) return;

        column.appendChild(dragElement);

        column.classList.remove("hoveer-over");

        saveTasks();

        dragElement = null;

    });

}


// Add drag events to all columns

columns.forEach(column => {
    addDragEventsColumn(column);
});


// ===============================
// Modal
// ===============================

const toggleModalButton =
    document.querySelector("#toggle-modal");

const modalBg =
    document.querySelector(".modal .bg");

const modal =
    document.querySelector(".modal");

const addTaskButton =
    document.querySelector("#add-new-task");


// Open modal

toggleModalButton.addEventListener("click", () => {

    modal.classList.toggle("active");

});


// Close modal

modalBg.addEventListener("click", () => {

    modal.classList.remove("active");

});


// ===============================
// Create New Task
// ===============================

addTaskButton.addEventListener("click", () => {

    const taskTitle =
        document.querySelector("#task-title-input").value;

    const taskDesc =
        document.querySelector("#task-desc-input").value;


    addTask(
        taskTitle,
        taskDesc,
        todo
    );


    saveTasks();


    modal.classList.remove("active");


    // Clear inputs

    document.querySelector("#task-title-input").value = "";

    document.querySelector("#task-desc-input").value = "";

});