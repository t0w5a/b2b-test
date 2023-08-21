import {Transaction} from '../../types/transaction';
import {WorkerSettings} from '../../types/worker-settings';
let timer: number = 0;
let arraySize: number = 0;
let intervalId: number = 0;
let loading: boolean = false;

addEventListener('message', ({ data }:{ data: WorkerSettings} ) => {
  timer = data.timer || 0;
  arraySize = data.arraySize || 0;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = 0;
  }

  loading = false;
  intervalId = setInterval(() => {
    if (loading) {
      return;
    }
    const response: Transaction[] = generateArray(arraySize);
    postMessage(response);
  }, timer);

});

function generateArray(size: number): Transaction[] {
  loading = true;
  const array: Transaction[] = [];
  if (size <= 0) {
    return array;
  }

  for (let i = 0; i < size; i++) {
    array.push({
      id: `${Math.floor(Math.random() * 100)}`, // unique UUID should be implemented here
      float: generateRandomFloatWithPrecision(18),
      int: Math.floor(Math.random() * 100),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      child: {
        id: `${Math.floor(Math.random() * 100)}`, // unique UUID should be implemented here
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      },
    });
  }

  loading = false;
  return array;
}

function generateRandomFloatWithPrecision(precision: number): number {
  const factor = Math.pow(2, precision);
  return Math.floor(Math.random() * factor) / factor * 10;
}
