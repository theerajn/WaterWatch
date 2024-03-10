var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/report", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var title = req.body.title;
    var report = req.body.report;
    var phno=req.body.phno;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "title":title,
        "report": report
    };
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('success.html');
});

app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

// Start the server on port 3000
app.listen(3003, () => {
    console.log("Listening on port 3003");
});
