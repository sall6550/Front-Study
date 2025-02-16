//todo리스트 만들기
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); // js-toDolist 클래스의 li태그 제거
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //toDos 의 array중 id값이 li.id와 같은거만 반환
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify:자바스크립트 object를 string으로 바꿔줌
} // 로컬스토리지에 key값 TODOS_LS value값 JSON.stringify(toDos)

//입력받은값 리스트 만들기
function paintToDo(text) {
  const li = document.createElement("li"); // li 태그 생성
  const delBtn = document.createElement("button"); // button 태그 생성
  delBtn.innerText = "❌"; //❌버튼 생성
  const span = document.createElement("span"); // span 태그 생성
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo); //❌버튼 클릭시 deleteToDo함수실행
  span.innerText = text; //span태그 안에 paintodo(text)함수입력값 입력
  li.appendChild(span); //li태그에 span태그삽입
  li.appendChild(delBtn); //li태그에 버튼태그 삽입
  li.id = newId;
  toDoList.appendChild(li); //js-todolist 안에 li태그 삽입
  const toDoObj = {
    text: text, //text:함수입력값
    id: newId, //id:todo길이 + 1
  }; //객체 text,id
  toDos.push(toDoObj); //toDos에 toDoObj값을 집어넣음
  saveToDos(); //saveToDos함수
}

function handleSubmit(event) {
  event.preventDefault(); //디폴드값 무시
  const currentValue = toDoInput.value; //input태그에 입력받은값
  paintToDo(currentValue); //input태그에 입력받은값을 painttodo함수로
  toDoInput.value = ""; //
}
//로컬스토리지에서 toDos 값을 가져옴
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text); //parsedToDos array각각의값을 paintToDo함수사용
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init(); //init() > loadToDos(),(handleSubmit() > paintToDo())
