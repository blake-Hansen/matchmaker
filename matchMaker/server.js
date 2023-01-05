
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const users = require("./app/data/friends.json")
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/app/public")))




// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/index.html"));
});

app.get("/app/public/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/count", function(req, res) {
    res.json({length: users.length})
  });

// Create New Account - takes in JSON input
app.post("/surveyResult", function(req, res) {    
  function sortin(a,b) { return a-b};
  const newcharacter = req.body;
  let addAccount5 = {
      "name": req.body[10],
      "photo": "rarfrfrf",
      "scores": [
        Number.parseInt(req.body[0]),
        Number.parseInt(req.body[1]),
        Number.parseInt(req.body[2]),
        Number.parseInt(req.body[3]),
        Number.parseInt(req.body[4]),
        Number.parseInt(req.body[5]),
        Number.parseInt(req.body[6]),
        Number.parseInt(req.body[7]),
        Number.parseInt(req.body[8]),
        Number.parseInt(req.body[9])
      ]
  }
 
  let comparisons = users.map(x => x.scores.reduce((a, e, i)=> a + Math.abs(e-addAccount5.scores[i]),0));
  let compare = [...comparisons];
  comparisons.sort(sortin);
  let returnAccount = compare.indexOf(comparisons[0])
  const accountToShow = users[returnAccount]
  console.log(accountToShow)
  res.send(accountToShow)
});


// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
