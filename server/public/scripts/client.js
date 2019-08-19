
$(document).ready( onReady );

function onReady(){
    console.log('okie');
    setupClickListeners();
    getTasks();
}

//Event handlers
function setupClickListeners() {
    $('#js-btn-addtask').on('click', handleAddTask);
    $('#js-viewtasks').on('click', '.js-btn-delete', handleDelete);
    $('#js-viewtasks').on('click', '.js-btn-complete', markCompleted);
  }

function handleAddTask() {
  let taskToSend = {
      task: $('#js-task-input').val(),
      status: 'incomplete'
  };
  postTask(taskToSend);
  $('#js-task-input').val('');
}

function handleDelete(event){
  const buttonDataObject = $(this).data();
  console.log(buttonDataObject);
  const deleteId = buttonDataObject.id;
  console.log(deleteId);
  deleteTask(deleteId);
}

function markCompleted (){
  $( this ).parent().css('background-color', 'blue');
  const saveBtnData = $(this).data();
  console.log($(this));
  const completedId = saveBtnData.id;
  putCompletedStatus(completedId);
  getTasks()
}

//API Server Connections
function postTask(taskToSend) {
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: taskToSend,
  }).then(function (response) {
    console.log('Response from server: ', response);
    getTasks();
  }).catch(function (error) {
    console.log('Error in POST', error);
    alert('Unable to add task at this time. Please try again later.');
  })
}

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/todo'
  }).then(function (response) {
    renderTasks(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
}
  
function putCompletedStatus(completedId){
    $.ajax({
        type: 'PUT',
        url: `/todo/${completedId}`,
    }).then(function(response) {
        console.log('Response from server.', response);
        
    }).catch(function(error) {
        console.log('Error in PUT', error)
        alert('Unable to update koala at this time. Please try again later.');
    });
}

function deleteTask(id){
  $.ajax({
    type: 'DELETE',
    url: `/todo/${id}`,
  }).then(function (response) {
    console.log('Response from server.', response);
    getTasks();
  }).catch(function (error) {
    console.log('Error in DELETE', error)
    alert('Unable to delete task at this time. Please try again later.');
  });
}

//Render to DOM
function renderTasks(response){
    let taskArray = response;
    $('#js-viewtasks').empty();
    
    for (let i=0; i<taskArray.length; i++){
        let task = taskArray[i];
        
        $('#js-viewtasks').append(`<tr>`);
        $('#js-viewtasks').append(`<td>${task.task}</td>`);
        
        if(task.status =='completed'){
            $('#js-viewtasks').append(`<td style="background-color: lightgreen">completed</td>`)
        } else {
            $('#js-viewtasks').append(`<td>incomplete <button class="js-btn-complete btn btn-success" data-id="${task.id}">&#x2714;</button></td>`);
        }
    $('#js-viewtasks').append(`<td><button class="js-btn-delete btn" data-id="${task.id}">Delete</button></td></tr>`)
    }
}