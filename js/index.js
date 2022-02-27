// $(document).on('input', ':input', function (e) {
//   const $this = $(this);
//   $this.toggleClass('filled', Boolean($this.val().length));
// });

const startingMinutes = 25
let time = startingMinutes * 60

const countdownEl = document.getElementById('clock')

setInterval(updateCountdown, 1000)

function updateCountdown() {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60

  countdownEl.innerHTML = `${minutes}:${seconds}`
  time--
}