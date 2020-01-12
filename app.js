const express = require('express');
const mongoose = require('mongoose');
const todo = require('./models/todo.js');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
let seedDB = require('./seeds.js');
mongoose.connect('mongodb+srv://pd:pd123@cluster0-wetsp.mongodb.net/todoApp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const app = express();

seedDB();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.get('/', function(req, res) {
	res.redirect('/todos');
});

app.get('/todos', function(req, res) {
	todo.find({}, function(err, listoftodos) {
		if (err) {
			console.log(err);
		} else {
			if (req.xhr) {
				res.json(listoftodos);
			} else {
				res.render('index', { todos: listoftodos });
			}
		}
	});
});

// app.get('/new', function(req, res) {
// 	res.render('new');
// });

app.post('/todos', function(req, res) {
	todo.create({ name: req.body.tdname }, function(err, newtodo) {
		if (err) {
			console.log(err);
		} else {
			res.json(newtodo);
		}
	});
});

// app.get('/todos/:tdid/edit', function(req, res) {
// 	todoid = req.params.tdid;

// 	todo.findById(todoid, function(err, foundtd) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(foundtd);
// 		}
// 	});
// });

app.put('/todos/:tdid', function(req, res) {
	let todoId = req.params.tdid;

	todo.findByIdAndUpdate(todoId, { name: req.body.tdname }, { new: true }, function(err, updatedtodo) {
		if (err) {
			console.log('error');
		} else {
			res.json(updatedtodo);
		}
	});
});

app.delete('/todos/:tdid', function(req, res) {
	let todoId = req.params.tdid;

	todo.findByIdAndDelete(todoId, function(err, deletedtodo) {
		if (err) {
			console.log('error');
		} else {
			res.json(deletedtodo);
		}
	});
});

app.listen(8080, function() {
	console.log('todo server started');
});
