import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.btn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btn.disabled = false;
    console.log(selectedDates[0]);
  },
};
const fp = flatpickr(refs.input, options);

console.log(fp.selectedDates[0]);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      this.onTick();
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const timer = new Timer({
  onTick: changeNumberOfTimer,
});

function changeNumberOfTimer(e) {
  const currentDate = Date.now();
  const choosenDate = new Date(fp.selectedDates);
  const timeLeft = choosenDate - currentDate;
  refs.days.textContent = convertMs(timeLeft).days;
  refs.hours.textContent = convertMs(timeLeft).hours;
  refs.minutes.textContent = convertMs(timeLeft).minutes;
  refs.seconds.textContent = convertMs(timeLeft).seconds;
}
function addLeadingZero() {
  return String(value).padStart(2, '0');
}

refs.btn.addEventListener('click', timer.start.bind(timer));
