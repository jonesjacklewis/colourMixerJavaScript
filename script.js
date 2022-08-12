const colourInputOne = document.getElementById('colorOne');
const squareOne = document.getElementById('colourOneSquare');
const rgbColorOne = document.getElementById('rgbColorOne');

const colourInputTwo = document.getElementById('colorTwo');
const squareTwo = document.getElementById('colourTwoSquare');
const rgbColorTwo = document.getElementById('rgbColorTwo');

const mixBtn = document.getElementById('mix');

const squareResult = document.getElementById('resultSquare');
const rgbResult = document.getElementById('rgbResult');

function decimalRound(num, places) {
  return Math.round(num * 10 ** places) / 10 ** places;
}

function hexToRgb(hex) {
  const hexWithoutHash = hex.replace('#', '');

  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);

  return {
    r,
    g,
    b,
  };
}

function hexToCmyk(hex) {
  // RGB to CMYK: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html

  const { r, g, b } = hexToRgb(hex);

  const rDash = decimalRound(r / 255, 2);
  const gDash = decimalRound(g / 255, 2);
  const bDash = decimalRound(b / 255, 2);

  const k = decimalRound(1 - Math.max(rDash, gDash, bDash), 2);

  let c = decimalRound((1 - rDash - k) / (1 - k), 2);
  let m = decimalRound((1 - gDash - k) / (1 - k), 2);
  let y = decimalRound((1 - bDash - k) / (1 - k), 2);

  if (Number.isNaN(c)) {
    c = 0;
  }

  if (Number.isNaN(m)) {
    m = 0;
  }

  if (Number.isNaN(y)) {
    y = 0;
  }

  return {
    c,
    m,
    y,
    k,
  };
}

function mixCmyk(colour1, colour2) {
  const c = (colour1.c + colour2.c) / 2;
  const m = (colour1.m + colour2.m) / 2;
  const y = (colour1.y + colour2.y) / 2;
  const k = (colour1.k + colour2.k) / 2;

  return {
    c,
    m,
    y,
    k,
  };
}

function cmykToRgb(cmyk) {
  // CMYK to RGB: https://www.rapidtables.com/convert/color/cmyk-to-rgb.html

  const r = decimalRound(255 * (1 - cmyk.c) * (1 - cmyk.k), 0);
  const g = decimalRound(255 * (1 - cmyk.m) * (1 - cmyk.k), 0);
  const b = decimalRound(255 * (1 - cmyk.y) * (1 - cmyk.k), 0);

  return {
    r,
    g,
    b,
  };
}

colourInputOne.addEventListener('input', () => {
  const hexInputOne = colourInputOne.value;
  const rgbInputOne = hexToRgb(hexInputOne);

  squareOne.style.backgroundColor = hexInputOne;
  rgbColorOne.innerText = `rgb(${rgbInputOne.r},${rgbInputOne.g},${rgbInputOne.b})`;
});

colourInputTwo.addEventListener('input', () => {
  const hexInputTwo = colourInputTwo.value;
  const rgbInputTwo = hexToRgb(hexInputTwo);

  squareTwo.style.backgroundColor = hexInputTwo;
  rgbColorTwo.innerText = `rgb(${rgbInputTwo.r},${rgbInputTwo.g},${rgbInputTwo.b})`;

});

mixBtn.addEventListener('click', () => {
  const hexInputOne = colourInputOne.value;
  const cmykInputOne = hexToCmyk(hexInputOne);

  const hexInputTwo = colourInputTwo.value;
  const cmykInputTwo = hexToCmyk(hexInputTwo);

  const colourMixCmyk = mixCmyk(cmykInputOne, cmykInputTwo);
  const colourMixRgb = cmykToRgb(colourMixCmyk);

  squareResult.style.backgroundColor = `rgb(${colourMixRgb.r},${colourMixRgb.g},${colourMixRgb.b})`;
  rgbResult.innerText = `rgb(${colourMixRgb.r},${colourMixRgb.g},${colourMixRgb.b})`;
});
