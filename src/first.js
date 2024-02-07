$(document).ready(function(){
  const date = new Date();
  function currentDay(){


  ///////// DATE //////////

  // const date = new Date(); 
  let day = ("" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let time = date.getTime();
  
  if(day == 1){
    day = (day) + 'st';
  }
  else if (day == 2){
    day = (day) + 'nd';
  }
  else if (day == 3){
    day = (day) + 'rd';
  }
  else{
    day = (day) + 'th';
  }

  //Month
  if(month == 1){
    month = 'January';
  }
  else if(month == 2){
    month = 'February';
  }
  else if(month == 3){
    month = 'March';
  }
  else if(month == 4){
    month = 'April';
  }
  else if(month == 5){
    month = 'May';
  }
  else if(month == 6){
    month = 'June';
  }
  else if(month == 7){
    month = 'July';
  }
  else if(month == 8){
    month = 'August';
  }
  else if(month == 9){
    month = 'September';
  }
  else if(month == 10){
    month = 'October';
  }
  else if(month == 11){
    month = 'November';
  }
  else if(month == 12){
    month = 'December';
  }

  let today = (day)+' '+ (month)+ ', '+ date.getFullYear();
  $('#currentDate').text(today);


}

//////----------- TIME ----------------//////////

function currentTime(){
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if(hh == 0){
    hh = 12;
  }
  if(hh > 12){
    hh = hh - 12;
    session = "PM";
  }
  if(hh < 10){
    hh = "0"+hh;
  }
  if(mm < 10){
    mm = "0"+mm;
  }
  let time = hh +':'+mm + ' '+session;
  $('#currentTime').text(time);

}

//------- Daily Quotes --------//

async function dailyQuotes(){
  const response = await fetch("https://type.fit/api/quotes");
  const quotes = await response.json();
  randomIndex = Math.floor(Math.random()*quotes.length);
  author = quotes[randomIndex].author.split(',')[0]
  // if(author === 'type.fit'){
  //   author = 'Anonymous';
  // }
  author = author === 'type.fit' ? 'Anonymous' : author;
  randomQuote = quotes[randomIndex].text + ' - ' + author; 
  $("#quote-text").text(randomQuote);
  // console.log(quotes)
}


setInterval(dailyQuotes, 10000);

currentDay();
currentTime();
dailyQuotes();
  
  







$("#pomodoroTimer").click();




// function startTimer(startingMinutes) {
//   $("#pomoDisplay").text(`${startingMinutes}:00`);
//   $(".timer-button").prop('disabled', true); // Disable all timer buttons
//   $('#pause, #reset').hide();
//   return start(startingMinutes);
// }



$("#pomodoroTimer").click(function(){
  let startingMinutes = 25;
  $("#pomoDisplay").text(`${startingMinutes}:00`);
  $("#pomodoroTimer").addClass('btn-success').removeClass('btn-light');
  $('#shortBreakTimer, #longBreakTimer').addClass('btn-light').removeClass('btn-success');
  $('#pause, #reset').hide();
  return start(startingMinutes);
})



$("#shortBreakTimer").click(function(){
  let startingMinutes = 5;
  $("#pomoDisplay").text(`0${startingMinutes}:00`);
  $("#shortBreakTimer").addClass('btn-success').removeClass('btn-light');
  $('#pomodoroTimer, #longBreakTimer').addClass('btn-light').removeClass('btn-success');
  $('#pause, #reset').hide();
  return start(startingMinutes);
})

 $("#longBreakTimer").click(function(){
  let startingMinutes = 15;
  $("#pomoDisplay").text(`${startingMinutes}:00`);
  $("#longBreakTimer").addClass('btn-success').removeClass('btn-light');
  $('#pomodoroTimer, #shortBreakTimer').addClass('btn-light').removeClass('btn-success');
  $('#pause, #reset').hide();
  return start(startingMinutes);
})

})

  
/////----------End of $(document).ready(func({...}))--------///////////



function start(startingMinutes){
  
  
  let intervalId;
  let time = startingMinutes * 60;


  $("#start").click(function(){
    let isPaused = false;
    if(!isPaused){
      intervalId = setInterval(countdownEvent,1000);
    }
  
    if(startingMinutes === 25){
      $("#shortBreakTimer, #longBreakTimer").prop('disabled', true);
      $("#pomodoroTimer").prop('disabled', false);
    console.log(startingMinutes)
    }
    else if(startingMinutes === 5){
      $("#pomodoroTimer, #longBreakTimer").prop('disabled', true);
      $("#shortBreakTimer").prop('disabled', false);
      console.log(startingMinutes)
    }
    else if(startingMinutes === 15){
      $("#pomodoroTimer, #shortBreakTimer").prop('disabled', true);
      $("#longBreakTimer").prop('disabled', false);
      console.log(startingMinutes)
    }
    $('#start').hide();
    $('#pause, #reset').show();
    // console.log("Started")
    // console.log(isPaused)
  })


  $("#pause").click(function(){
    clearInterval(intervalId);
    isPaused = true;

    $('#pause').hide();
    $('#start, #reset').show();
    $('#start').text("Resume");
    // console.log("Paused")
    // console.log(isPaused)
  })
  


  $("#reset").click(function(){
    clearInterval(intervalId);
    // console.log(intervalId)
    // console.log(startingMinutes)
    console.log("I am interval ID: "+intervalId)
    startingMinutes = startingMinutes < 10 ? '0' + startingMinutes : startingMinutes;
    countdownEl.innerHTML = `${startingMinutes}:00`;
    $("#pomodoroTimer, #shortBreakTimer, #longBreakTimer").prop('disabled', false);
    $('#reset,#pause').hide();
    $('#start').show();
    $('#start').text("Start");
  })



  const countdownEl = document.getElementById("pomoDisplay"); //Displaying Timer on Screen
  
  function countdownEvent(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0'+ seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    console.log(time);

    if (time < 0){
      clearInterval(intervalId);
    }
  }
  
}




///Task
{
  let tasks = [];
  let taskID = 0;
  // Function to render tasks
  function renderTasks() {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      
      tasks.forEach((task, index) => {
          const card = document.createElement('div');
          card.classList.add('card');

          const contentTextbox = document.createElement('div');
          contentTextbox.classList.add('content-text');

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.completed;
          
          checkbox.addEventListener('change', () => toggleCompleted(index));

          const span = document.createElement('span');
          span.textContent = task.content;
          if (task.completed) {
              span.classList.add('completed');
          }

          const editInput = document.createElement('input');
          editInput.type = 'text';
          editInput.style.display = 'none';

          const buttonContainer = document.createElement('div');
          buttonContainer.classList.add('button-container');

          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.addEventListener('click', () => toggleEdit(index));

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteTask(index));

          contentTextbox.appendChild(checkbox);
          contentTextbox.appendChild(span);
          contentTextbox.appendChild(editInput);
          card.appendChild(contentTextbox);
          card.appendChild(buttonContainer);
          buttonContainer.appendChild(editButton);
          buttonContainer.appendChild(deleteButton);

          taskList.appendChild(card);
      });
  }

  // Function to add a new task
  function addTask() {
      const taskInput = document.getElementById('taskInput');
      const content = taskInput.value.trim();
      
      if (content !== '') {
        
        tasks.push({ content, completed: false });
        taskInput.value = '';
        taskID = taskID + 1;
        renderTasks();
        console.log("Task Input: "+ content);
        console.log("Task Input: "+ taskID);
      }
  }

  // Function to toggle task completion status
  function toggleCompleted(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
  }

  // Function to toggle task edit mode
  function toggleEdit(index) {
      const card = document.querySelectorAll('.card')[index];
      const span = card.querySelector('span');
      const editInput = card.querySelector('input[type="text"]');
      const editButton = card.querySelector('button');

      if (editInput.style.display === 'none') {
          span.style.display = 'none';
          editInput.style.display = 'inline';
          editInput.value = span.textContent;
          editButton.textContent = 'Save';
      } else {
          span.textContent = editInput.value;
          tasks[index].content = editInput.value;
          span.style.display = 'inline';
          editInput.style.display = 'none';
          editButton.textContent = 'Edit';
      }
  }

  // Function to delete a task
  function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
  }

  // Initial render
  renderTasks();
}