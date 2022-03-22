//require the express app
var express = require('express');
 
//to call express
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//placeholders for added task
var task = ["Build Web App", "Deploy Web App"];
 
//placeholders for removed task
var complete = ["Study Cloud"];
 
//post route for adding new task
app.post("/addtask", function(req, res) {
var newTask = req.body.newtask;
//add the new task from the post route
task.push(newTask);
res.redirect("/");
});
 
app.post("/removetask", function(req, res) {
var completeTask = req.body.check;
//check for the "typeof" the different completed task, then add into the complete task
if (typeof completeTask === "string") {
complete.push(completeTask);
//check if the completed task already exits in the task when checked, then remove it
task.splice(task.indexOf(completeTask), 1);
} else if (typeof completeTask === "object") {
for (var i = 0; i < completeTask.length; i++) {
complete.push(completeTask[i]);
task.splice(task.indexOf(completeTask[i]), 1);
}
}
res.redirect("/");
});
 
//render the ejs and display added task, completed task
app.get("/", function(req, res) {
res.render("index", { task: task, complete: complete });
});
 
//set app to listen on port 3000
app.listen(3000, function() {
console.log("OSFY Test App Server is running on port 3000!");
});