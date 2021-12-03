$(document).ready(function() {
  if (!checkCookie()) {
    timeLeft = Number(getCookie("timer"));
  }
  const timer = document.getElementById("timer");
  timer.innerHTML = `
  <h2>Your Pickup is ready in:</h2>
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">
      ${formatTimeLeft(timeLeft)}
    </span>
  </div>
  `;
  //check if a timer is already running in background
  if (!checkCookie()) {
    $('#timer').removeClass('timer');
    let time = getCookie('timer');
    //exists
    startTimer(Number(time));
  } else {
    setCookie('timer', TIME_LIMIT, TIME_LIMIT);
    //new
    $('#timer').removeClass('timer');
    startTimer(TIME_LIMIT);
  }
});
