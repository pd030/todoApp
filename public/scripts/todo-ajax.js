$('#new-todo-form').submit(function(e) {
	e.preventDefault();
	let formData = $(this).serialize();
	console.log(formData);
	$.post('/todos', formData, function(data) {
		$('#todo-list').append(
			`
		<li class="list-group-item">
          
     
   <form action="/todos/${data._id}" method="POST" class="edit-todo-form">
        <div class="form-group">
          <input type="text" class="form-control" name="tdname" value="${data.name}" required>
        <button type="submit"  class="btn btn-primary btn-md mt-2 ">Update</button>
          </div>

  </form >


              <em> ${data.name} </em>           
       <div class="float-right">
            
              <button  class="btn btn-warning btn-sm  m-1 edit-button">Edit</button> 
          
              <form style="display: inline;" action="/todos/${data._id}" method="POST" class="delete-todo-form">
              
                <button type="submit" class="btn btn-danger btn-sm  m-1">Delete</button>
            
              </form>
  
         </div>  
            
          
      </li>
     
	
		`
		);
		$('#new-todo-form').find('.form-control').val('');
	});
});

// edit form
$('#todo-list').on('click', '.edit-button', function() {
	$(this).parent().siblings('.edit-todo-form').toggle();
});

// update todo
$('#todo-list').on('submit', '.edit-todo-form', function(e) {
	e.preventDefault();

	let formData = $(this).serialize();
	let formAction = $(this).attr('action');
	$originalItem = $(this).parent('.list-group-item');

	$.ajax({
		url: formAction,
		data: formData,
		type: 'PUT',
		originalItem: $originalItem,
		success: function(data) {
			this.originalItem.html(
				`
				   
   <form action="/todos/${data._id}" method="POST" class="edit-todo-form">
   <div class="form-group">
	 <input type="text" class="form-control" name="tdname" value="${data.name}" required>
   <button type="submit"  class="btn btn-primary btn-md mt-2 ">Update</button>
	 </div>

</form >


		 <em> ${data.name} </em>           
  <div class="float-right">
	   
		 <button  class="btn btn-warning btn-sm  m-1 edit-button">Edit</button> 
	 
		 <form style="display: inline;" action="/todos/${data._id}" method="POST" class="delete-todo-form">
		 
		   <button type="submit" class="btn btn-danger btn-sm  m-1">Delete</button>
	   
		 </form>

	</div>  
	   

		
				
				`
			);
		}
	});
});

// delete todo item
$('#todo-list').on('submit', '.delete-todo-form', function(e) {
	e.preventDefault();

	let confirmResponse = confirm('ARE YOU SURE?');

	if (confirmResponse) {
		let formAction = $(this).attr('action');
		$itemToDelete = $(this).closest('.list-group-item');
		$.ajax({
			url: formAction,
			type: 'DELETE',
			itemToDelete: $itemToDelete,
			success: function(data) {
				this.itemToDelete.remove();
			}
		});
	} else {
		$(this).find('button').blur();
	}
});
