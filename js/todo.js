const todo_form = document.querySelector('#todo-form');
const todo_input = document.querySelector('#todo-form input');
const todo_list_container = document.querySelector('#todo-list-container');
let todos = []; // local storage에 관여하는 변수

const TODOLIST_KEY = 'todo';
const SAVED_TODOS_KEY = 'todos';

/* local storage에 todo들을 저장하는 함수 */
function saveToDo() {
  localStorage.setItem(SAVED_TODOS_KEY, JSON.stringify(todos));
}

/* todo list를 만들어주는 함수*/
function createToDo(input_todo_obj) {
  const new_todo_list = document.createElement('li');
  new_todo_list.id = input_todo_obj.id;
  const new_todo_text = document.createElement('span');
  new_todo_text.innerText = input_todo_obj.text;
  const delete_btn = document.createElement('button');
  delete_btn.innerText = '🗑️';
  const toast_msg = document.querySelector('#toast_msg');
  toast_msg.innerText = 'todo가 추가 되었습니다.';

  // new_todo_list, new_todo_text, delete_btn 위치 선정
  todo_list_container.appendChild(new_todo_list);
  new_todo_list.appendChild(new_todo_text);
  new_todo_list.appendChild(delete_btn);

  // todo 추가 toast message 출력
  toast_msg.classList.add('active');
  setTimeout(function () {
    toast_msg.classList.remove('active');
  }, 1500);

  // todo_list(todo 1개) 삭제 함수 호출
  delete_btn.addEventListener('click', deleteToDo);
}

/* 작성한 todo를 삭제하는 함수 */
function deleteToDo(event) {
  // event.target을 통해 클릭 이벤트의 객체 선택
  // event.target.parentElement를 통해 부모 elment인 new_todo_list 삭제
  // filter 함수를 이용해서 false인 element를 제외한 새로운 array를 리턴
  list_to_delete = event.target.parentElement;
  list_to_delete.remove();
  todos = todos.filter((todo) => (todo.id !== parseInt(list_to_delete.id) ? true : false));
  saveToDo();

  // todo 삭제 toast message 출력
  const toast_msg = document.querySelector('#toast_msg');
  toast_msg.innerText = 'todo가 삭제되었습니다.';
  toast_msg.classList.add('active');
  setTimeout(function () {
    toast_msg.classList.remove('active');
  }, 1500);
}

/* todo 제출 시 작동하는 함수 */
function onToDoSubmit(event) {
  // 브라우저 기본 동작 방지
  event.preventDefault();

  // 새로 입력된 todo를 new_todo에 저장, todo_input 초기화
  const new_todo = todo_input.value;
  todo_input.value = '';

  // local storage에서의 element 선택을 위해 map 형태의 object 생성
  const new_todo_obj = {
    id: Date.now(),
    text: new_todo,
  };

  // todos(local storage와 연관된 변수)에 object 저장
  todos.push(new_todo_obj);

  // todo리스트를 만드는 함수 호출
  createToDo(new_todo_obj);

  // local storage에 todo 값 저장
  saveToDo();
}

todo_form.addEventListener('submit', onToDoSubmit);

// local storage에서 값을 가져옴.
const saved_todos = localStorage.getItem(SAVED_TODOS_KEY);
if (saved_todos != null) {
  const parsed_todos = JSON.parse(saved_todos);
  todos = parsed_todos;
  parsed_todos.forEach((element) => {
    createToDo(element);
  });
}
