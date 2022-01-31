import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
      window.alert('Please choose a date in the future');
      return;
    }
    refs.btn.disabled = false;
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(refs.input, options);

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

refs.btn.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const timeLeft = choosenDate - currentDate;
    daysEl.textContent = convertMs(timeLeft).days;
    hoursEl.textContent = convertMs(timeLeft).hours;
    minutesEl.textContent = convertMs(timeLeft).minutes;
    secondsEl.textContent = convertMs(timeLeft).seconds;
    btnStart.disabled = true;
    fpickr.input.setAttribute('disabled', 'disabled');
  }, 1000);
});
