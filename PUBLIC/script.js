const list = document.getElementById("todoList");

fetchTodos();

function fetchTodos() {
    fetch("/api/todos")
    .then(res => res.json())
    .then(data => {
        list.innerHTML = "";

        data.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="check" ${todo.completed ? "checked":""}>
                <span class="${todo.completed ? "completed":""}">${todo.task}</span>
                <button onclick="deleteTodo('${todo.id}')">Delete</button>
            `;
           
            li.querySelector(".check").addEventListener("change",(e)=>{
                const status=e.target.checked;
                li.querySelector("span").classList.toggle("completed",status);
                toggleStatus(todo.id,status);
            });
            

            list.appendChild(li);
        });
    });
}

function addTodo() {
    const input = document.getElementById("taskInput");
    const task = input.value;

    fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    })
    .then(() => {
        input.value = "";
        fetchTodos();
    });
}

function deleteTodo(id) {
    fetch("/api/todos/" + id, {
        method: "DELETE"
    })
    .then(() => fetchTodos());
}

 function toggleStatus(id,status){
    fetch(`/api/todos/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({completed:status})
    });
}
