const startStopBtn = document.getElementById('startStopBtn')
const iconPlayStop = document.getElementById('iconPlayStop')
const stopBtn = document.getElementById('stopBtn')
const clock = document.getElementById('clock')
const msg = document.querySelector('.msg')
const pomodorosToday = document.querySelector('.pomos-today')
const limpar = document.querySelector('.limpar')
clock.innerText = '25:00'

pomodorosToday.innerText = localStorage.pomosToday

function countPomosToday() {
    if (localStorage.pomosToday) {
        localStorage.pomosToday = Number(localStorage.pomosToday) + 1
    } else {
        localStorage.pomosToday = 1
    }
    pomodorosToday.innerText = localStorage.pomosToday
}

limpar.addEventListener('click', () => {
    localStorage.pomosToday = 0
    pomodorosToday.innerText = localStorage.pomosToday
})

let minutes = 24
let seconds = 60

let flag = 'play'
let zerou = false

let countdown

function start() {
    if (zerou) {
        seconds = 60
        minutes = msg.innerText === 'FOCA' ? 24 : 4
        countdown = setInterval(timer, 10)
    }
    else
        countdown = setInterval(timer, 10)
}

function stop() {
    clearInterval(countdown)
    seconds = 60
    minutes = msg.innerText === 'FOCA' ? 24 : 4
    clock.innerText = '25:00'
    iconPlayStop.setAttribute('src', './images/play.png')
    flag = 'play'
}

function finished() {
    clearInterval(countdown)
    zerou = true
    iconPlayStop.setAttribute('src', './images/play.png')
    if (msg.innerText === 'PAUSA') {
        msg.innerText = 'FOCA'
        clock.innerText = '25:00'
        playSoundAlarm()
        setTimeout(() => {
            playSoundAlarm()
        }, 3000)
    } else {
        msg.innerText = 'PAUSA'
        clock.innerText = '05:00'
        countPomosToday()
        playSoundAlarm()
    }

}

function timer() {
    seconds--

    var format = ((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds))
    if (seconds == 0) {
        seconds = 60
        minutes--
    }

    if (seconds >= 0 && minutes >= 0) {
        clock.innerText = `${format}`
    } else if (seconds == 60 && minutes == -1) {
        flag = 'play'
        finished()
    }
}

startStopBtn.addEventListener('click', () => {
    if (flag === 'play') {
        iconPlayStop.setAttribute('src', './images/stop.png')
        //msg.innerText = 'FOCA'
        start()
        flag = 'stop'
    }
    else if (flag === 'stop') {
        stop()
        flag = 'play'
        iconPlayStop.setAttribute('src', './images/play.png')
    }
})

function changeBG() {
    let unsplashPhoto = 'https://source.unsplash.com/random/1366x768/?cars'
    document.body.style.cssText = `background: url('${unsplashPhoto}');
    color: var(--text-color);
    background-repeat: no-repeat;
    background-size: cover;`
}

changeBG()

function playSoundAlarm() {
    const alarm = new Audio('../sounds/alarm.mp3');
    alarm.play();
}

