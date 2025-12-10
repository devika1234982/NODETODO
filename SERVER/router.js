const fs = require("fs");
const path = require("path");
const { getTodo, addTodo, deleteTodo, updateTodo } = require("./controllers");


function render(res, filename, contentType) {
    const filePath = path.join(__dirname, "../public", filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("File Not Found");
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

module.exports = (req, res) => {
    const { method, url } = req;

    
    if (method === "GET" && url === "/") {
        return render(res, "index.html", "text/html");
    }

    
    if (url === "/todo.css") {
        return render(res, "todo.css", "text/css");
    }

    
    if (url === "/script.js") {
        return render(res, "script.js", "text/javascript");
    }

    
    if (method === "GET" && url === "/api/todos") {
        return getTodo(req, res);
    }

   
    if (method === "POST" && url === "/api/todos") {
        return addTodo(req, res);
    }

   
    if (method === "DELETE" && url.startsWith("/api/todos/")) {
        const id = url.split("/")[3];
        return deleteTodo(req, res, id);
    }

  
    if (method === "PATCH" && url.startsWith("/api/todos/")) {
        const id = url.split("/")[3];
        return updateTodo(req, res, id);
    }

   
    res.writeHead(404);
    res.end("404 Not Found");
};

