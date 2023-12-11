document.addEventListener("DOMContentLoaded", function () {
function showTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ampm = "AM";
    if (h > 12) {
      ampm = "PM";
      h -= 12;
    }
    hours = h.toString().padStart(2, '0')
    min = m.toString().padStart(2, '0')
    sec = s.toString().padStart(2, '0')
    document.getElementById("hour").innerHTML = hours
    document.getElementById("min").innerHTML = min
    document.getElementById("sec").innerHTML = sec
    document.getElementById("ampm").innerHTML = ampm
    
    //document.getElementById("clock").innerHTML = h.toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0') + " " + ampm;
    
    //Date
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let monthName = "";
    
    if (month == 1){
      monthName = "January"
    }
    else if (month == 2){
      monthName = "February"
    }
    else if (month == 3){
      monthName = "March"
    }
    else if (month == 4){
      monthName = "April"
    }
    else if (month == 5){
      monthName = "May"
    }
    else if (month == 6){
      monthName = "June"
    }
    else if (month == 7){
      monthName = "July"
    }
    else if (month == 8){
      monthName = "August"
    }
    else if (month == 9){
      monthName = "September"
    }
    else if (month == 10){
      monthName = "October"
    }
    else if (month == 11){
      monthName = "November"
    }
    else {
      monthName = "December"
    }

    let dayType = ""
    if (day == 1){
      dayType = "st"
    }
    else if (day == 2){
      dayType = "nd"
    }
    else if (day == 3){
      dayType = "rd"
    }
    else if (day > 3){
      dayType = "th"
    }
    else{
      dayType = "Invalid"
    }

    let currentDate = day + dayType +' '+monthName+', '+year;
    
    document.getElementById("date").innerHTML = currentDate;
  }
  
  setInterval(showTime, 1000);


  ////////////////////// Quotes Data ////////////////////////////////////////

    const api_url = "https://type.fit/api/quotes";
    
    async function getQuote() {
      try{
        const response = await fetch(api_url);
        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex].text;
        const randomAuthor = data[randomIndex].author.split(",")[0];

        if (randomAuthor == 'type.fit'){
          document.getElementById("author").innerHTML = "- Anonymous";
        }
        else{
          document.getElementById("author").innerHTML = "- "+ randomAuthor;
        }

        //console.log("Quote:", randomQuote);
        document.getElementById("text").innerHTML = '"'+ randomQuote +'"';
        
        //console.log("Author:", randomAuthor);

      } catch(error){
        console.error("Error fetching quotes:", error);
      }
    }
    getQuote();

    setInterval(getQuote, 10000);


  //////////////////////// Task section //////////////////////////
    

    // Get references to HTML elements
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const completedTask = document.getElementById("completedTask");

    
    // Event listener for adding a new task
    window.addTask = function () {

      const taskText = taskInput.value.trim();
      
      if (taskText !== "") {
        
        const li = document.createElement("li");
        li.innerHTML = `
          <input type="checkbox" class="largerCheckbox" onchange="completeTask(this)">
          <span>${taskText}</span>
          <button onclick="removeTask(this)" style="background:none; border:none; font-size:18px; "><i class="fa fa-trash" aria-hidden="true" ></i></button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
      }
    }

    // Event listener for completing a task
    window.completeTask = function (checkbox) {
      const li = checkbox.closest("li");
      if (checkbox.checked) {
        //span.style.textDecoration = "line-through";
        completedTask.appendChild(li);
       
        //li.remove()
      } else {
        taskList.appendChild(li);
      }
    }
    // Event listener for removing a task
    window.removeTask = function (button, taskId) {

      const li = button.closest("li");
      li.remove();
    }
    
  
    // Event listener for pressing Enter key
    taskInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });


    

});


  