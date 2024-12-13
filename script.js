const addButton = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const leftList = document.getElementById("left-list");
const rightList = document.getElementById("right-list");

const createTodoItem = (text, container) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.textContent = text;
    li.draggable = true;
    
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    
    // Delete button functionality
    deleteButton.addEventListener("click", () => {
        li.remove(); // Remove the task from the list
    });
    
    // Append the delete button to the task item
    li.appendChild(deleteButton);
    
    li.addEventListener('dragstart', () => {
        li.classList.add('dragging');
    });

    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
    });

    container.appendChild(li);
};

const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        createTodoItem(todoText, leftList); // Default task goes to "Left"
        todoInput.value = ""; // Clear the input
    }
};

addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Draggable functionality for both containers
const dragOverHandler = (e, container) => {
    e.preventDefault();
    const draggingTodo = document.querySelector('.dragging');
    const closestTodo = getClosestTodo(e.clientY, container);
    
    if (closestTodo && closestTodo !== draggingTodo) {
        const rect = closestTodo.getBoundingClientRect();
        const offset = e.clientY - rect.top;
        if (offset < rect.height / 2) {
            container.insertBefore(draggingTodo, closestTodo);
        } else {
            container.insertBefore(draggingTodo, closestTodo.nextElementSibling);
        }
    }
};

const getClosestTodo = (y, container) => {
    const todosArray = [...container.querySelectorAll('.todo-item')];
    return todosArray.reduce((closest, todo) => {
        const rect = todo.getBoundingClientRect();
        const offset = y - rect.top - rect.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { todo, offset };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).todo;
};

// Now allow tasks to be dragged between Left and Right containers

leftList.addEventListener("dragover", (e) => {
    dragOverHandler(e, leftList);
});

rightList.addEventListener("dragover", (e) => {
    dragOverHandler(e, rightList);
});

leftList.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggingTodo = document.querySelector('.dragging');
    leftList.appendChild(draggingTodo);
});

rightList.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggingTodo = document.querySelector('.dragging');
    rightList.appendChild(draggingTodo);
});
