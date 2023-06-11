const startStopBtn = document.getElementById("startStopBtn");
const iconPlayStop = document.getElementById("iconPlayStop");
const stopBtn = document.getElementById("stopBtn");
const clock = document.getElementById("clock");
const msg = document.querySelector(".msg");
const pomodorosToday = document.querySelector(".pomos-today");
const zerar = document.querySelector(".zerar");
clock.innerText = "25:00";

pomodorosToday.innerText = localStorage.pomosToday
  ? localStorage.pomosToday
  : 0;

function weather() {
  const APIKey = "6950078ef52cc4e05ab79bd2f7b0fda1";
  var city;
  if (localStorage.city) {
    city = localStorage.city;
  } else {
    localStorage.city = "Goiânia";
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const weather = document.querySelector(".weather-location");

      weather.innerHTML = `${city}, ${parseInt(
        json.main.temp
      )} <span>°C</span>`;
    });
}

setTimeout(() => {
  weather();
}, 1000);

function countPomosToday() {
  if (localStorage.pomosToday) {
    localStorage.pomosToday = Number(localStorage.pomosToday) + 1;
  } else {
    localStorage.pomosToday = 1;
  }
  pomodorosToday.innerText = localStorage.pomosToday;
}

zerar.addEventListener("click", () => {
  localStorage.pomosToday = 0;
  pomodorosToday.innerText = localStorage.pomosToday;
});

let minutes = 24;
let seconds = 60;

let flag = "play";
let zerou = false;

let countdown;

function start() {
  if (zerou) {
    seconds = 60;
    minutes = msg.innerText === "FOCA" ? 24 : 4;
    countdown = setInterval(timer, 10);
  } else countdown = setInterval(timer, 10);
}

function stop() {
  clearInterval(countdown);
  seconds = 60;
  if (msg.innerText === "FOCA") {
    minutes = 24;
    clock.innerText = "25:00";
  } else {
    minutes = 4;
    clock.innerText = "05:00";
  }
  iconPlayStop.setAttribute("src", "./images/play.png");
  flag = "play";
}

function finished() {
  clearInterval(countdown);
  zerou = true;
  iconPlayStop.setAttribute("src", "./images/play.png");
  if (msg.innerText === "PAUSA") {
    msg.innerText = "FOCA";
    clock.innerText = "25:00";
    playSoundAlarm();
    setTimeout(() => {
      playSoundAlarm();
    }, 2000);
  } else {
    msg.innerText = "PAUSA";
    clock.innerText = "05:00";
    countPomosToday();
    playSoundAlarm();
  }
}

function timer() {
  seconds--;

  var format =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  if (seconds == 0) {
    seconds = 60;
    minutes--;
  }

  if (seconds >= 0 && minutes >= 0) {
    clock.innerText = `${format}`;
  } else if (seconds == 60 && minutes == -1) {
    flag = "play";
    finished();
  }
}

startStopBtn.addEventListener("click", () => {
  if (flag === "play") {
    iconPlayStop.setAttribute("src", "./images/stop.png");
    //msg.innerText = 'FOCA'
    start();
    flag = "stop";
  } else if (flag === "stop") {
    stop();
    flag = "play";
    iconPlayStop.setAttribute("src", "./images/play.png");
  }
});

function changeBG() {
  let unsplashPhoto = "https://source.unsplash.com/random/1366x768/?cars";
  document.body.style.cssText = `background: url('${unsplashPhoto}');
    color: var(--text-color);
    background-repeat: no-repeat;
    background-size: cover;`;
}

changeBG();

function playSoundAlarm() {
  const alarm = new Audio("../sounds/alarm.mp3");
  alarm.play();
}

function displayTime() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  var clock = document.getElementById("time");
  clock.textContent = time;
}

function displayDate() {
  var date = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var formattedDate = date.toLocaleDateString(undefined, options);
  var date = document.getElementById("date");
  date.textContent = formattedDate;
}

// Chamando as funções para atualizar a hora e a data a cada segundo
setInterval(displayTime, 1000);
setInterval(displayDate, 1000);


document.getElementById("opensettings").addEventListener("click", function() {
    document.getElementById("formPopup").style.display = "flex";
  });
  
  document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("formPopup").style.display = "none";
  });
  