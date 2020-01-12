const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	name: String,
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('todo', todoSchema);
