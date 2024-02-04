/* API Key 저장 함수 */
function saveWeatherAPIKey(apiKey) {
  localStorage.setItem('WEATHER_API_KEY', apiKey);
}

/* API Key 불러오는 함수 */
function getWeatherAPIKey() {
  return localStorage.getItem('WEATHER_API_KEY');
}

/* 에러 토스트 메시지 출력 함수 */
function showErrorToast(message) {
  const errorToastMsg = document.getElementById('toast_msg');
  errorToastMsg.innerText = message;

  errorToastMsg.classList.add('active');
  setTimeout(function () {
    errorToastMsg.classList.remove('active');
  }, 1500);
}

/* API KEY 제출 함수 */
function onAPIKeySubmit(event) {
  event.preventDefault();

  const apiKeyInput = document.getElementById('apiKey');
  const apiKey = apiKeyInput.value.trim();

  if (apiKey !== '') {
    saveWeatherAPIKey(apiKey);
    apiKeyInput.value = '';
  } else {
    showErrorToast('Please enter a valid API Key.');
  }
}

document.getElementById('apiKeyForm').addEventListener('submit', onAPIKeySubmit);

/* geolocation success의 경우의 함수: 유저의 위치 정보를 받아온다. */
function onGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const apiKey = getWeatherAPIKey();

  if (apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weather = document.querySelector('#weather span:first-child');
        weather.innerText = `Weather: ${data.weather[0].main} / Temperature: ${data.main.temp}\n`;
        const city = document.querySelector('#weather span:last-child');
        city.innerText = `City: ${data.name}`;
      });
  } else {
    showErrorToast('API Key is not set. Please save your API Key.');
  }
}

/* geolocation error인 경우의 함수 */
function onGeoError() {
  showErrorToast("Can't find current location!");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
