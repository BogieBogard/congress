const prices = document.querySelectorAll('.bar');

function fadeIn() {
  this.classList.add('showNumber');
};

function adjustBars(prices) {
  setTimeout(() => {
    prices.forEach( price => {
      price.classList.add('adjustBars');
    });
  }, 1100)
}

prices.forEach( price => { price.addEventListener('transitionend', fadeIn) } );

adjustBars(prices);