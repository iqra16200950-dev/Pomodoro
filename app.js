

const bells = new Audio('bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const stopBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-restart');
const session = document.querySelector('.minutes'); 
const session2 = document.querySelector('.seconds'); 
const errorText = document.querySelector('.app-message');

const song = new Audio('song.mp3');
song.loop = true; 
const volumen = 0.2; 
song.volume = volumen;



const addMinutes = document.getElementsByClassName("btn-arrow");


for (let i = 0; i < addMinutes.length; i++) {

    addMinutes[i].addEventListener("click", function() {
      if(state) {
          
          const buttonId = this.id;
          const isMinute = buttonId.includes("mu") || buttonId.includes("md");
          const isIncrement = buttonId.includes("mu") || buttonId.includes("su");
          const sessionElement = isMinute ? session : session2; 
          let value = Number.parseInt(sessionElement.textContent);
          
          if (isIncrement) 
            value = value < 9 ? "0" + (value + 1) : value + 1;
          else 
            value = value <= 10 ? "0" + (value - 1) : value - 1;
          
          
          sessionElement.innerText = (value === 60) ? "00" : (value === 0 || value === "00") ? "59" : value; 
      }else{
          errorText.innerText="Timer started"
          errorText.style.color="red";

          setTimeout(() => {
            errorText.innerText = "Running...";
            errorText.style.color = "navyblue";
          }, 3000); 
      }
  });

}

let myInterval; 
let state = true;

const appTimer = () => {
  song.play();
  const sessionAmount = Number.parseInt(session.textContent);
  const sessionAmount2 = Number.parseInt(session2.textContent);
  if(state) {
    errorText.innerText="Running..."
    errorText.style.color="green";
    state = false;
    let totalSeconds = (sessionAmount * 60) + sessionAmount2;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');
    
      totalSeconds--;
    
      let minutesLeft = Math.floor(totalSeconds/60);
      let secondsLeft = totalSeconds % 60;
    
      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`
    
      if(minutesLeft === 0 && secondsLeft === 0) {
        song.pause();
        bells.play();
        clearInterval(myInterval);
      }
    }
    myInterval = setInterval(updateSeconds, 1000);
  } else {
          errorText.innerText="Timer started"
          errorText.style.color="red";

          setTimeout(() => {
            errorText.innerText = "Running";
            errorText.style.color = "navyblue";
          }, 3000); 
  }
}

// pause the timer
const stopTimer = () => {
  song.pause();
  errorText.innerText = "press start to begin";
  errorText.style.color = "black";
  clearInterval(myInterval);
  state = true;
}

// reset the timer
const resetTimer = () => {
  session.innerText="25";
  session2.innerText="30";
  stopTimer();
}

startBtn.addEventListener('click', appTimer);
//new Events
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);