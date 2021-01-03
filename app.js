const express = require("express");
const bodyparser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"))

let items = ["Buy food", "cook", "Eat it"];
let workItems = [];

app.get("/", function(req, res) {
  //checking the day of the week//
  //res.write() is a way of the sending multiple pieces of html, you then use res.send after to send all your message//
  let today = new Date();
  //var currentday = today.getDate();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  let day = today.toLocaleString("en-US", options);
  res.render("list", {
    listTitle: day,
    newItemlists: items
  });
})

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if(req.body.list ==="Work"){
    workItems.push(item)
    res.redirect("/work")
  }else{
    items.push(item);
    res.redirect("/");
  }


})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work list", //title of the page//
    newItemlists: workItems
  });
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

const port = process.env.port || 3000;
app.listen(port, function() {
  console.log("server running on " port);
})
