const FULL_DASH_ARRAY = 283;
// Warning occurs at 10s
const WARNING_THRESHOLD = 10;
// Alert occurs at 5s
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
let remainingPathColor = COLOR_CODES.info.color;

const TIME_LIMIT = 240;
//initally no time has passed, but this will count up
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

function formatTimeLeft(time) {
  //the largest round integer less than or equal to the result of time divided being by 60
  const minutes = Math.floor(time / 60);

  //seconds are the remainder of the time divided by 60
  let seconds = time % 60;

  //if the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  //the output in MM:SS format
  return `${minutes}:${seconds}`;
};

function startTimer(time) {
  //keep track of timer in a browser cookie
  timerInterval = setInterval(() => {
    //amount of time passed increments by 1
    timePassed += 1;
    timeLeft = time - timePassed;
    console.log(timeLeft);
    //set the timer value with curr time
    setCookie('timer', timeLeft, timeLeft);
    //update the time
    document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);
    setCircleDashArray();
    setRemainingPathColor(timeLeft);
    if (checkCookie()) {
      $('#timer').addClass('timer');
      $('#timer').toggleClass('timer-show');
      clearTimer();
    }
  }, 1000);
};

function clearTimer() {
  clearInterval(timerInterval);
};

function setCookie(cname, cvalue, exseconds) {
  const d = new Date();
  d.setTime(d.getTime() + (exseconds*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
};

//returns value of cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

function checkCookie() {
  let username = getCookie("timer");
  if (username != "") {
   return false;
  } else {
    return true;
  }
};

//divides time left by the defined time limit
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
};

//update the dasharray value as time passes, starting with 283
function setCircleDashArray() {
  const circleDashArray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDashArray);
};

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);

  // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
};
