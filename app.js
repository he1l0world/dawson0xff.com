const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
var path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));


const db = mongoose.connection;
const dburl = 'mongodb://127.0.0.1/login';

var Schema = mongoose.Schema;

var accountSchema = new Schema({
	username: String,
	password: String
})
var Account = mongoose.model('account', accountSchema);

mongoose.connect(dburl, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const hostname = '127.0.0.1';
const port = 3000;
app.use(express.static('public_html'))


app.post('/login/:username/:password', (req, res) => {
	
	let u = req.params.username;
	let p = req.params.password;
	
	console.log(req.body);
	Account.find({username: u, password: p}).exec(function(error, results){
		if(results.length == 1){
			res.cookie("login", {username:u}, {maxAge: 10000});
			res.send('login');
		}else{
			res.send('failed');
		}
	});
	
})

function authenticate(req, res, next){
	let u = req.cookies.login.username;


}


app.post('/create/:username/:password', (req, res) => {
	console.log(req.body);
	let u = req.params.username;
	let p = req.params.password;
	

	Account.find({username: u}).exec(function(error, results){
		if(results.length == 0){
			var account = new Account({'username': u, 'password': p});
			account.save(function(err){if(err) console.log('an error occurred');})
			res.send('created');
		}else{
			res.send('failed');
		}
	});
	
})
app.listen(port, ()=>{
	console.log('app listening: ')
})
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

*/
