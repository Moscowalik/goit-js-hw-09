import Notiflix from 'notiflix';

const refs = {
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount" ]'),
  btn: document.querySelector('button'),
};

const position = 0;

refs.btn.addEventListener('submit', createPromise);

function createPromise(position, delay) {
  position += 1;
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
