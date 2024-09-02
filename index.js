console.log("Welcome to To-Do App");

let todos = [];

let toDoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTasksButton = document.getElementById("get-todos");

getPendingTasksButton.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.status != "Completed");
    reRenderToDos();
})

todoInputBar.addEventListener("keyup", function toggleSaveButton(){
    let todoText = todoInputBar.value;
    if(todoText == 0){
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");
    }
});

saveButton.addEventListener("click", function getTextAndAddToDo(){
    let todoText = todoInputBar.value;
    if(todoText == 0) return;
    let todo = {text :todoText, status: 'In Progress', completedButtonText : 'Completed'};
    todos.push(todo);
    addToDo(todo, todos.length);
    todoInputBar.value = '';
});


function reRenderToDos(){
    toDoDataList.innerHTML = '';
    todos.forEach((element, idx) =>{
        addToDo(element, idx+1);
    });
}


function removeTodo(event){ 
    let deleteButtonPressed = event.target;
    let indexToBeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indexToBeRemoved, 1);
    reRenderToDos();
}


function completedTodo(event){
    let completedButtonPressed = event.target;
    let indexToBeCompleted = Number(completedButtonPressed.getAttribute("todo-idx"));

    //Toggling of Button Finished and Undo
    if(todos[indexToBeCompleted].status == "Completed"){
        todos[indexToBeCompleted].status = "In Progress";
        todos[indexToBeCompleted].completedButtonText = "Completed";
    }
    else{
        todos[indexToBeCompleted].status = "Completed"; 
        todos[indexToBeCompleted].completedButtonText = "Undo";
    }

    todos.sort((a, b) => {
        if(a.status == 'Completed'){
            return 1; // b is placed before a
        }
        return -1;  // b is placed after a
    });


    reRenderToDos();
}

function editTodo(event){
    let editButtonPressed = event.target;
    let indexToBeEdit = Number(editButtonPressed.getAttribute("todo-idx"));
    let taskDiv = document.querySelector(`div[todo-idx = "${indexToBeEdit}"]`);
    let input = document.querySelector(`input[todo-idx = "${indexToBeEdit}"]`);
    taskDiv.style.display = "none";
    input.type = "text";
    input.value = taskDiv.textContent;
}

function saveEdittedToDo(event){
    let input = event.target;
    let indexToBeEdit = Number(input.getAttribute("todo-idx"));
    let taskDiv = document.querySelector(`div[todo-idx = "${indexToBeEdit}"]`);

    if(event.keyCode == 13){
        taskDiv.textContent = input.value;
        taskDiv.style.display = "block";
        input.value = '';
        input.type = "hidden";
    }
}


function addToDo(todo, todoCount){
    // We will create here whole row and append inside the todo-data
    console.log("function called");
    let rowDiv = document.createElement("div");
    let todoTasks = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoTask = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let completedButton = document.createElement("button");
    let editButton =  document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    // Adding css classes to the elements.(Bootstrap)
    rowDiv.classList.add("row");
    todoTasks.classList.add("todo-tasks", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoTask.classList.add("todo-task", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger", "delete-todo");
    completedButton.classList.add("btn", "btn-success", "completed-todo");
    editButton.classList.add("btn", "btn-warning", "edit-todo");
    hiddenInput.classList.add("form-control", "todo-task");


    // Adding Attributes
    completedButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.setAttribute("todo-idx", todoCount-1);
    editButton.setAttribute("todo-idx", todoCount-1);
    todoTask.setAttribute("todo-idx", todoCount-1);
    hiddenInput.setAttribute("todo-idx", todoCount-1);
    hiddenInput.type = "hidden";

    // Adding click listeners
    deleteButton.onclick = removeTodo;
    completedButton.onclick = completedTodo;
    editButton.onclick = editTodo;
    hiddenInput.addEventListener("keypress", saveEdittedToDo);


    todoNumber.textContent = `${todoCount}.`;
    todoTask.textContent = todo.text;// Sets the ToDo text sent from the input element. 
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    completedButton.textContent = todo.completedButtonText;
    editButton.textContent = "Edit";


    // Creating the div on DOM
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(completedButton);
    todoActions.appendChild(editButton);

    todoTasks.appendChild(todoNumber);
    todoTasks.appendChild(todoTask);
    todoTasks.appendChild(hiddenInput);
    todoTasks.appendChild(todoStatus);
    todoTasks.appendChild(todoActions);

    rowDiv.appendChild(todoTasks);
    rowDiv.appendChild(hr);

    toDoDataList.appendChild(rowDiv);
}






























// Reference
// let getTodosButton = document.getElementById('get-todos');
// registration of event listener
// getTodosButton.addEventListener("click", () => {
//     console.log("clicked");
// });

// getTodosButton.onclick = () => {
//     console.log("clicked")
// }

// function clickBtn() {
//     console.log("click")
// }