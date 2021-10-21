/** @format */

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Users");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
	console.log("connection succeeded");
});

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/sign_up", function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var state = req.body.state;
	var zip = req.body.zip;
	var cardD = req.body.cardD;
	var mmyy = req.body.mmyy;
	var cvv = req.body.cvv;

	var data = {
		name: name,
		email: email,
		state: state,
		zip: zip,
		cardD: cardD,
		mmyy: mmyy,
		cvv: cvv,
	};
	console.log(data);
	db.collection("paymentD").insertOne(data, function (err, collection) {
		if (err) throw err;
		console.log("Record inserted Successfully");
	});

	return res.redirect("D:\\VS_CODE\\clgProject\\active\\active\\payment.html");
});
app.use('/static', express.static('views'))

var server = app.listen(3000, function () {
	console.log("Node server is running..");
});

console.log("server listening at port 3000");
