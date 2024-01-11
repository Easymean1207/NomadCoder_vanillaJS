const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

const login_form = document.querySelector('#login-form');
const login_input = document.querySelector('#login-form input');
const remove_data_btn = document.querySelector('#delete_btn');
const gretting = document.querySelector('#gretting');

/* submit시 실행 */
function onLoginSubmit(event) {
  // 브라우저 기본 이벤트 방지
  event.preventDefault();

  // login form 감추기
  login_form.classList.add(HIDDEN_CLASSNAME);

  // username을 localStorage에 저장
  const username = login_input.value;
  localStorage.setItem(USERNAME_KEY, username);

  showGrettings(username);
}

/* login-form을 보여주는 함수 */
function showLoginForm() {
  login_form.classList.remove(HIDDEN_CLASSNAME);
  remove_data_btn.classList.add(HIDDEN_CLASSNAME);
  login_form.addEventListener('submit', onLoginSubmit);
}

/* greeting을 보여주는 함수 */
function showGrettings(username) {
  gretting.innerText = `Hello ${username}! \n How are you today?`;
  gretting.classList.remove(HIDDEN_CLASSNAME);
  remove_data_btn.classList.remove(HIDDEN_CLASSNAME);
  login_form.classList.add(HIDDEN_CLASSNAME);
}

/* local storage의 데이터를 제거하는 함수 */
function removeStorage() {
  localStorage.removeItem(USERNAME_KEY);
  window.location.reload();
}

const saved_username = localStorage.getItem(USERNAME_KEY);

/* saved_username이 있는 지 체크 */
if (saved_username == null) {
  showLoginForm();
} else {
  showGrettings(saved_username);
}

remove_data_btn.addEventListener('click', removeStorage);
