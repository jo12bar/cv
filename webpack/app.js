import { MDCRipple } from '@material/ripple/index';

const buttonRipples = [];

for (const button of document.querySelectorAll('.test-button')) {
  buttonRipples.push(new MDCRipple(button));
}

console.log('Hello, world!');
