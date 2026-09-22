const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;


console.log(todo, progress, done);

const tasks = document.querySelectorAll(".task");


tasks.forEach(task =>{
    task.addEventListener("drag", (e) =>{
        // console.log("dragging", e);
        dragElement = task;
    })
})

function addDragEventsColumn(column){
    column.addEventListener("dragenter", (e) =>{
        e.preventDefault();
        column.classList.add("hoveer-over");
    })
    column.addEventListener("dragover", (e) =>{
        e.preventDefault();
    })
    column.addEventListener("dragleave", (e) =>{
        e.preventDefault();
        column.classList.remove("hoveer-over");
    })


    column.addEventListener("drop", (e) =>{ 
        e.preventDefault();

        console.log("Dropped", dragElement, column);

        column.appendChild(dragElement);
        column.classList.remove("hover-over")

    })
}

addDragEventsColumn(todo);
addDragEventsColumn(progress);
addDragEventsColumn(done)

