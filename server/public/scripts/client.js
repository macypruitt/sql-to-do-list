
$(document).ready( onReady );

function onReady(){
    console.log('okie');
    setupClickListeners();
    getTasks();
}

function setupClickListeners() {
    $('#js-btn-addtask').on('click', handleAddTask);
    //$('#js-viewtasks').on('click', '.js-btn-delete', handleDelete);
    $('#js-viewtasks').on('click', '.js-btn-complete', markCompleted);
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
       
        if(task.status =='completed'){
            $('#js-viewtasks').append(`<td style="background-color: blue">completed</td>`)
        } else {
            $('#js-viewtasks').append(`<td>incomplete</td>`);
            $('#js-viewtasks').append(`<td><button class="js-btn-complete btn" data-id="${task.id}">Complete</button></td>`);
        }

    $('#js-viewtasks').append(`<td><button class="js-btn-delete btn" data-id="${task.id}">Delete</button></td></tr>`)
      
    }

}

function markCompleted (){
    $( this ).parent().css('background-color', 'blue');
    const saveBtnData = $(this).data();
    console.log($(this));
    const completedId = saveBtnData.id;
    putCompletedStatus(completedId);
    getTasks()
}
function turnBlue(){
    $( this ).parent().css('background-color', 'blue');
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