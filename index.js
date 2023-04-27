
const clockElement = document.getElementById("clock");
const alarmForm = document.getElementById("alarm-Form");
const alarmHourInput =document.getElementById("alarm-hours");
const alarmMinInput = document.getElementById("alarm-minutes");
const alarmSecInput = document.getElementById("alarm-second");
const alarmAMPMSelect =document.getElementById("alarm-AmPm");
const alarmList = document.getElementById("alarm-list");


//  set time
setInterval(()=>{
    const now =new Date()
    clockElement.textContent = now.toLocaleTimeString();

},1000)

// alarm song
var audio = new Audio("./AlarmClock.mp3");
// ./AlarmClock.mp3

// play alarm 
function play(){
    audio.play();
}

// pause alarm 
function pause(){
    audio.pause();
}

// alarm handle 
alarmForm.addEventListener("submit",(event)=>{
     event.preventDefault();

  var hours =Number(alarmHourInput.value);
    const minutes = Number(alarmMinInput.value);
    const seconds = Number(alarmSecInput.value);
    const AmPm  = alarmAMPMSelect.value;   
    if(isNaN(hours)|| isNaN(minutes)|| isNaN(seconds)){
        alert("invaild time");
        return;
    }
    // set railway time
    if(AmPm==="pm" && hours !== 12){
        hours+=12;
    }else if(AmPm==="am" && hours === 12){
        hours = 0;
    }
    // valid input 
    if(hours > 24 || hours < 0 || minutes > 60 || minutes < 0 || seconds > 60 || seconds < 0){
        alert("invaild time");
        return;
    }

    // create alarm clock
    const alarmTime = new Date();
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(seconds);
    const alarm ={
        time : alarmTime,
        element : document.createElement("li")
    };
    alarm.element.textContent = alarmTime.toLocaleTimeString();


// set alarm to trigger specific time
let resetAlarm =setTimeout (()=>{
    play();
    alert("alarm plz woke up");
    pause();
    alarmList.removeChild(alarm.element);
},alarmTime-new Date());

// add the new alarm to the list 
alarmList.appendChild(alarm.element);

// delete alarm
const deleteButton = document.createElement("button");
deleteButton.textContent =("delete");
deleteButton.addEventListener("click",()=>{
    alarmList.removeChild(alarm.element);
    clearTimeout(resetAlarm);
});
alarm.element.appendChild(deleteButton);
alarmHourInput.value ="";
alarmMinInput.value ="";
alarmSecInput.value ="";
// alarmAMPMSelect.selectedIndex = 0;
alarmAMPMSelect.selectedIndex=0;


})





