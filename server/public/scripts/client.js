
$(document).ready( onReady );

function onReady(){
    console.log('okie');
    setupClickListeners();
}

function setupClickListeners() {
    $('#js-btn-addtask').on('click', handleAddTask);
    //$('#js-viewtasks').on('click', '.js-btn-delete', handleDelete);
    //$('#js-viewtasks').on('click', '.js-btn-markAsComp', markCompleted);
  }

  function handleAddTask() {

    let taskToSend = {
        task: $('#js-task-input').val(),
        status: 'incomplete'
    };

    postTask(taskToSend);

    //clear input
    $('#js-task-input').val('');
  }

  function postTask(taskToSend) {
    // ajax call to server to POST task
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

function renderTasks(response){
    let taskArray = response;
    $('#js-viewtasks').empty();
    
    for (let i=0; i<taskArray.length; i++){
        let task = taskArray[i];
        $('#js-viewtasks').append(`<tr><td>${task.task}</td>`);
        $('#js-viewtasks').append(`<td>${task.status}</td>`);
        if(task.status =='incomplete'){
            $('#js-viewtasks').append(`<td><button class="js-btn-complete btn" data-id="${task.id}">Complete</button></td>`)
          }else{
            $('#js-viewtasks').append(`<td> </td>`);
          }
          $('#js-viewtasks').append(`<button class="js-btn-delete btn" data-id="${task.id}">Delete</button></td></tr>`);
          
    }

}