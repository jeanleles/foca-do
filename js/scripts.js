const startStopBtn = document.getElementById('startStopBtn')
const iconPlayStop = document.getElementById('iconPlayStop')
const stopBtn = document.getElementById('stopBtn')
const clock = document.getElementById('clock')
const msg = document.querySelector('.msg')
clock.innerText = '25:00'

setInterval(function () {
    changeBG()
}, 2000)

let minutes = 24
let seconds = 60

let flag = 'play'
let zerou = false

let countdown

function start() {
    if (zerou) {
        seconds = 60
        minutes = msg.innerText === 'FOCA' ? 24 : 4
        countdown = setInterval(timer, 100)
    } 
    else
    countdown = setInterval(timer, 100)
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
    clock.innerText = '00:00'
    clearInterval(countdown)
    zerou = true
    iconPlayStop.setAttribute('src', './images/play.png')
    if (msg.innerText === 'PAUSA') {
        msg.innerText = 'FOCA'
        playSoundAlarm()
        setTimeout( () => {
            playSoundAlarm()
        },3000)
    } else {
        msg.innerText = 'PAUSA'
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

function playSoundAlarm() {
    const alarm = new Audio('../sounds/alarm.mp3');
    alarm.play();
}


