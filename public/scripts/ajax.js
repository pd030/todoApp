// $.get('/todos', function(data) {
// 	debugger;
// });

// $('form').submit(function(e) {
// 	e.preventDefault();
// 	let formData = $(this).serialize();
// 	console.log(formData);
// 	$.post('/todos', formData, function(data) {
// 		console.log(data);
// 	});
// });

// $('form').submit(function(e) {
// 	e.preventDefault();
// 	let formData = $(this).serialize();
// 	let formAction = $(this).attr('action');

// 	console.log(formData);
// 	$.ajax({
// 		url: formAction,
// 		data: formData,
// 		type: 'PUT',
// 		success: function(data) {
// 			debugger;
// 		}
// 	});
// });

// $('form').submit(function(e) {
// 	e.preventDefault();

// 	let formAction = $(this).attr('action');

// 	$.ajax({
// 		url: formAction,
// 		type: 'DELETE',
// 		success: function(data) {
// 			debugger;
// 		}
// 	});
// });
