const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
refs.startBtn.disabled = false;

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    this.isActive = true;
    refs.startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      updateBodyColor();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    refs.startBtn.disabled = false;
  }
}
const timer = new Timer({});

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateBodyColor(e) {
  document.body.style.backgroundColor = getRandomHexColor();
  console.log(document.body.style.backgroundColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
