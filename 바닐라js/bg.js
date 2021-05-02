const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image(); //새로운 image 요소를 만들음
  image.src = `images/${imgNumber + 1}.jpg`; //image.src = images/4(ex).jpg
  image.classList.add("bgImage"); // image 태그에 클래스네임으로 bgImage를 넣음
  body.appendChild(image); //body태그 아래에 image.src = images/4(ex).jpg를 넣음
}

// 0~4까지 숫자(상수)를 랜덤으로 리턴함
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
