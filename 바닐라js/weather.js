const weather = document.querySelector(".js-weather");
const API_KEY = "d0a787acb22c439f24ec9c6b93407c97";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      //fetch가 완료되길 기다림(서버로부터 데이터가 들어올때까지 기다림)
      // console.log(response.json());
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
} //로컬스토리지에 위도와 경도 값 저장하기

//위치요청 허용눌렀을때
function handleGeoSucces(position) {
  const latitude = position.coords.latitude; //위도
  const longitude = position.coords.longitude; //경도
  const coordsObj = {
    //cordesObj객체 생성
    latitude, //latitude = latitude
    longitude, //longitude = longitude
  };
  saveCoords(coordsObj); //로컬스토리지에 위도와 경도 값 저장하기
  getWeather(latitude, longitude); //위도와 경도값으로 api 불러옴
}
//위치요청 거부눌렀을때
function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  //위치정보 요청 팝업을 띄우고(허용눌렀을때,거부눌렀을때)
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS); //로컬스토리지에 key값이 coords인 아이템을 가져옴
  if (loadedCords === null) {
    //로컬스토리지에 key값이 coords가 없다면
    askForCoords(); //askForCoords 함수 호출
  } else {
    //로컬스토리지에 key값이 coords인게 있다면
    const parseCoords = JSON.parse(loadedCords); //loadedCords = {"latitude":37.520756899999995,"longitude":126.9003409}
    //JSON.parse('true'); >>> true
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
