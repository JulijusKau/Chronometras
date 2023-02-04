//Sukurti Chronometrą su JS.//1. Sukurti 'start/stop' mygtuką, kuris paleistų ir sustabdytų chronometrą.//2. Sukurti 'reset' mygtuką, kuris sustabdytų ir panaikintų chronometro reikšmes ('nunulintų').//3. Sukurti 'lap' mygtuką, kurį paspaudus laikas išsisaugotų ir būtų matomas apačioje. Šį mygtuką galima spausti kelis kartus ir taip užfiksuoti laikus (pvz. lenktynėse). Sukurti ir 'delete times' mygtuką, kuris šiuos laikus ištrintų.//4. Išsaugoti laikai su 'lap' funkcija turi būti matomi net ir perkrovus puslapį.

//komentaras sau: reikia padaryt kad pacio laikmacio skaiciai nedrebetu, greiciausiai tvarkyti CSS///

let mainClock = document.getElementById("main-clock");
let centisecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let isClockRunning = null;

let menuDiv = document.getElementById("menu");
let startButton = document.getElementById("start-stop");
let lapButton = document.getElementById("lap");
let resetButton = document.getElementById("reset");
let clearButton = document.getElementById("clear");

let recordTimes = document.getElementById("record-times");
let recordTimesList = document.createElement("ol");
let recordArray = [];
recordTimes.append(recordTimesList);

function displayTime() {
  centisecond += 1;
  if (centisecond > 99) {
    centisecond = 0;
    second += 1;
    if (second > 59) {
      second = 0;
      minute += 1;
      if (minute > 59) {
        minute = 0;
        hour += 1;
      }
    }
  }
  mainClock.innerText = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}:${
    centisecond < 10 ? "0" + centisecond : centisecond
  }`;
}

startButton.addEventListener("click", () => {
  if (isClockRunning !== null) {
    startButton.textContent = "Start";
    startButton.style.backgroundColor = "Green";
    clearInterval(isClockRunning);
    isClockRunning = null;
  } else if (isClockRunning == null) {
    startButton.textContent = "Stop";
    startButton.style.backgroundColor = "Red";
    isClockRunning = setInterval(displayTime, 10);
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(isClockRunning);
  isClockRunning = null;
  centisecond = 0;
  second = 0;
  minute = 0;
  hour = 0;
  mainClock.innerText = "00:00:00:00";
  startButton.textContent = "Start";
  startButton.style.backgroundColor = "Green";
});

function lapTimes() {
  if (isClockRunning !== null) {
    let lapTime = document.createElement("li");
    lapTime.className = "record";
    lapTime.innerText = mainClock.innerText;

    recordTimesList.append(lapTime);
    recordArray.push(lapTime.innerText);

    localStorage.setItem("record-times", JSON.stringify(recordArray));

    console.log(mainClock.innerText);
    console.log(recordArray);
    console.log(localStorage);
  }
}

lapButton.addEventListener("click", lapTimes);

function clearLapTimes() {
  localStorage.clear();
  recordTimesList.innerHTML = " ";
  recordArray = [];
  console.log(localStorage);
}

clearButton.addEventListener("click", clearLapTimes);

let savedTimes = localStorage.getItem("record-times");
let savedTimesParsed = JSON.parse(savedTimes);
console.log(JSON.parse(savedTimes));

for (let i = 0; i < savedTimesParsed.length; i++) {
  let savedTime = document.createElement("li");
  savedTime.className = "last-record";
  savedTime.innerText = savedTimesParsed[i];
  recordTimesList.append(savedTime);
}
