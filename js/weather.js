const WEATHER_API = config.API_KEY;

/* 유저의 위치 정보를 받아옴. */
function onGeoSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`You are located in ${latitude}, ${longitude}`);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('#weather span:first-child');
      weather.innerText = `weather:${data.weather[0].main} / temperature:${data.main.temp}\n`;
      const city = document.querySelector('#weather span:last-child');
      city.innerText = data.name;
    });
}

/* geolocation error toast message 출력 */
function onGeoError() {
  const error_toast_msg = document.querySelector('#toast_msg');
  error_toast_msg.innerText = "Can't find current location!";

  toast_msg.classList.add('active');
  setTimeout(function () {
    toast_msg.classList.remove('active');
  }, 1500);
}

navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError);
