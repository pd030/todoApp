const mongoose = require('mongoose');
const todo = require('./models/todo.js');

let data = [
	{
		name: 'go to bed 10pm'
	},
	{
		name: 'take a bath'
	},
	{
		name: 'do homework'
	}
];

function seedDB() {
	todo.deleteMany({}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('todo list deleted');
		}
	});
}

module.exports = seedDB;
