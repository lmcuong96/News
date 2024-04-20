"use strict";
/**Hàm lưu dữ liệu vào bộ nhớ*/
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**Hàm lấy dữ liệu từ bộ nhớ*/
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**lấy dữ liệu từ userArr từ LocalStorage*/
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
//chuyển đổi về class instance
const userArr = users.map((user) => parseUser(user));

/**người dùng hiện tại*/
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

/**danh sách todo từ localStorage*/
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
/**chuyển đổi về class instance*/
const todoArr = todos.map((todo) => parseTask(todo));

/**hàm để chuyển từ JS Object sang Class Instance của User*/
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    // dành cho bài 9
    userData.category,
    userData.pageSize
  );

  return user;
}

/**hàm để chuyển từ JS Object sang Class Instance của Task*/
function parseTask(todoData) {
  const todo = new Task(todoData.task, todoData.owner, todoData.isDone);
  return todo;
}
