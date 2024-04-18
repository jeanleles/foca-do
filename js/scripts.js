const startStopBtn = document.getElementById('startStopBtn');
const iconPlayStop = document.getElementById('iconPlayStop');
const stopBtn = document.getElementById('stopBtn');
const clock = document.getElementById('clock');
const msg = document.querySelector('.msg');
const pomodorosToday = document.querySelector('.pomos-today');
const zerar = document.querySelector('.zerar');
const cityfield = document.querySelector('#city');

function updateBg() {
  const bgseted = localStorage.bgset;
  let unsplashPhoto = `https://source.unsplash.com/random/1366x768/?${bgseted}`;
  console.log(unsplashPhoto);
  document.body.style.cssText = `background: url('${unsplashPhoto}');
    color: var(--text-color);
    background-repeat: no-repeat;
    background-size: cover;`;
}

function changeBG() {
  let bgseted = '';
  if (localStorage.bgset) {
    bgseted = localStorage.bgset;
    document.getElementById('bg').value = bgseted;
  } else {
    document.getElementById('bg').value = 'NorthernLights';
    localStorage.bgset = 'NorthernLights';
  }
  updateBg();
}
changeBG();

// document.getElementById('updatebg').addEventListener('click', function () {
//   updateBg();
// });

pomodorosToday.innerText = localStorage.pomosToday
  ? localStorage.pomosToday
  : 0;

function setPomodoro() {
  const pomo25 = document.querySelector('#pomo25');
  const pomo50 = document.querySelector('#pomo50');
  const defaultFocus = 25;
  const defaultPause = 5;

  if (localStorage.pomoFocus === '50') {
    pomo50.checked = true;
    localStorage.pomoFocus = 50;
    localStorage.pomoPause = 10;
  } else {
    pomo25.checked = true;
    localStorage.pomoFocus = defaultFocus;
    localStorage.pomoPause = defaultPause;
  }
}
setPomodoro();

let pomoFocus;
let pomoPause;

function setStart() {
  if (localStorage.pomoFocus && localStorage.pomoFocus == 50) {
    clock.innerText = '50:00';
    pomoFocus = 49;
    pomoPause = 9;
  } else {
    clock.innerText = '25:00';
    pomoFocus = 24;
    pomoPause = 4;
  }
  msg.innerHTML = 'Foca';
}
setStart();

async function getWeather(city) {
  const APIKey = '6950078ef52cc4e05ab79bd2f7b0fda1';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  );
  const data = await response.json();
  return data;
}

function setCity(city) {
  localStorage.city = city;
  cityfield.value = city;
}

async function weather() {
  let city = localStorage.city || 'Brasil';
  setCity(city);

  try {
    const data = await getWeather(city);
    const weatherLocation = document.querySelector('.weather-location');
    weatherLocation.innerHTML = `${city}, ${parseInt(
      data.main.temp
    )} <span>°C</span>`;
  } catch (error) {
    console.error('Erro ao obter o clima: ', error);
  }
}
weather();

function countPomosToday() {
  if (localStorage.pomosToday) {
    localStorage.pomosToday = Number(localStorage.pomosToday) + 1;
  } else {
    localStorage.pomosToday = 1;
  }
  pomodorosToday.innerText = localStorage.pomosToday;
}

zerar.addEventListener('click', () => {
  localStorage.pomosToday = 0;
  pomodorosToday.innerText = '0';
});

let minutes = pomoFocus;
let seconds = 60;

let flag = 'play';
let zerou = false;

let countdown;

function start() {
  if (zerou) {
    seconds = 60;
    minutes = msg.innerText === 'Foca' ? pomoFocus : pomoPause;
    countdown = setInterval(timer, 1000);
  } else countdown = setInterval(timer, 1000);
}

function stop() {
  clearInterval(countdown);
  seconds = 60;
  if (msg.innerText === 'Pausa') {
    minutes = pomoFocus;
    if (localStorage.pomoFocus == 50) {
      clock.innerText = '50:00';
    } else clock.innerText = '25:00';
    msg.innerHTML = 'Foca';
  } else {
    minutes = pomoPause;
    if (localStorage.pomoFocus == 50) {
      clock.innerText = '10:00';
    } else clock.innerText = '05:00';
    msg.innerHTML = 'Pausa';
  }
  iconPlayStop.setAttribute('src', './images/play.png');
  flag = 'play';
}

function finished() {
  clearInterval(countdown);
  zerou = true;
  iconPlayStop.setAttribute('src', './images/play.png');
  if (msg.innerText === 'Pausa') {
    msg.innerText = 'Foca';
    if (localStorage.pomoFocus == 50) {
      clock.innerText = '50:00';
    } else clock.innerText = '25:00';
    playSoundAlarm();
    setTimeout(() => {
      playSoundAlarm();
    }, 2000);
  } else {
    msg.innerText = 'Pausa';
    if (localStorage.pomoFocus == 50) {
      clock.innerText = '10:00';
    } else clock.innerText = '05:00';
    countPomosToday();
    playSoundAlarm();
  }
}

function timer() {
  seconds--;

  var format =
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds);
  if (seconds == 0) {
    seconds = 60;
    minutes--;
  }

  if (seconds >= 0 && minutes >= 0) {
    clock.innerText = `${format}`;
  } else if (seconds == 60 && minutes == -1) {
    flag = 'play';
    finished();
  }
}

startStopBtn.addEventListener('click', () => {
  if (flag === 'play') {
    iconPlayStop.setAttribute('src', './images/stop.png');
    //msg.innerText = 'FOCA'
    start();
    flag = 'stop';
  } else if (flag === 'stop') {
    stop();
    flag = 'play';
    iconPlayStop.setAttribute('src', './images/play.png');
  }
});

function playSoundAlarm() {
  const alarm = new Audio('../sounds/alarm.mp3');
  alarm.play();
}

function displayTime() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  var clock = document.getElementById('time');
  clock.textContent = time;
}

function displayDate() {
  var date = new Date();
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  var formattedDate = date.toLocaleDateString(undefined, options);
  var date = document.getElementById('date');
  date.textContent = formattedDate;
}

setInterval(displayTime, 1000);
setInterval(displayDate, 1000);

document.getElementById('opensettings').addEventListener('click', function () {
  document.getElementById('formPopup').style.display = 'flex';
  cityfield.value = localStorage.city;
});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  localStorage.city = cityfield.value;
  city = localStorage.city;

  const pomo25 = document.querySelector('#pomo25');
  const pomo50 = document.querySelector('#pomo50');
  if (pomo25.checked) {
    localStorage.pomoFocus = 25;
    localStorage.pomoPause = 5;
  } else if (pomo50.checked) {
    localStorage.pomoFocus = 50;
    localStorage.pomoPause = 10;
  }

  zerou = true;
  stop();
  setStart();
  weather();

  localStorage.bgset = document.getElementById('bg').value;
  bgseted = document.getElementById('bg').value;
  changeBG();

  document.getElementById('formPopup').style.display = 'none';
});

function closeFormPopup() {
  document.getElementById('formPopup').style.display = 'none';
}

document.querySelector('.close-button').addEventListener('click', closeFormPopup);
document.querySelector('.btn-cancel').addEventListener('click', closeFormPopup);
