"use strict";
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
//////////////////////////
/**a. Thêm mới Todo và Lưu dữ liệu vào LocalStorage*/
addBtn.addEventListener("click", function () {
  // loại bỏ trường hợp task bị trống
  if (taskInput.value.trim() === "") {
    alert("Hãy nhập tittle");
  } else {
    //task: được lấy từ thẻ input mà người dùng nhập vào.
    // owner: Username sẽ lấy theo User hiện đang login vào hệ thống.
    // isDone: Khi tạo mới thì mặc định là false.
    const todo = new Task(taskInput.value, currentUser.username, false);
    //thêm todo mới vào todoArr
    todoArr.push(todo);
    //Lưu xg localStorage
    saveToStorage("todoArr", todoArr);
    //hiển thị todo
    renderTodoList();
    //Xóa form vừa nhập
    taskInput.value = "";
  }
});
//////////////////////
/**b.Hàm hiển thị todoList -Bạn cần lấy dữ liệu từ LocalStorage và hiển thị ra theo như Template. Lưu ý: Bạn chỉ hiển thị các Task có owner trùng với username của người dùng hiện tại.*/
function renderTodoList() {
  let html = "";
  // trong todoArr lọc ra các todo của currentUser hiện tại
  todoArr
    .filter((todo) => todo.owner === currentUser.username)
    .forEach(function (todo) {
      html += `
      <li class="${todo.isDone ? "checked" : " "}">${
        todo.task
      }<span class="close">×</span></li>
        `;
    });
  todoList.innerHTML = html;
  toggleTask();
  deleteTask();
}
renderTodoList();
/////////////////////
/**  c. Toggle Task - Khi click vào một Task thì bạn có thể đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành, dữ liệu này cũng được cập nhật vào LocalStorage tương ứng.*/
function toggleTask() {
  // Lấy tất cả phần tử li chứa các task
  document.querySelectorAll("#todo-list li").forEach(function (li) {
    li.addEventListener("click", function (e) {
      // loại bỏ nút delete ra khỏi li vì  nút delete là phần tử con của li
      if (e.target !== li.children[0]) {
        //thêm class checked
        li.classList.toggle("checked");
        //tìm ra task vừa click
        const todo = todoArr.find(
          (todoItem) =>
            //tìm ra đúng currentUser
            todoItem.owner === currentUser.username &&
            //Loại bỏ nút delete
            todoItem.task === li.textContent.slice(0, -1)
        );
        console.log(todo);
        // thay đổi isDone nếu đã có class checked thì là true còn lại là false - isDone mặc định là false
        todo.isDone = li.classList.contains("checked") ? true : false;
        //Lưu xuống hệ localStorage
        saveToStorage("todoArr", todoArr);
      }
    });
  });
}

//////////////////////
/**d. Delete Task - Khi click vào nút Delete ở bên cạnh các Task, xóa task tương ứng ra khỏi danh sách.*/

function deleteTask() {
  //chọn tất cả các phần tử trong todo-list chứa class close và tạo 1 vòng lặp cho chúng
  document.querySelectorAll("#todo-list .close").forEach(function (span) {
    // với mỗi 1 phần tử span thì lắng nghe sự kiện click
    span.addEventListener("click", function (e) {
      // xác nhận lại sự kiện
      if (confirm("Bạn chắc chắn muốn xóa?")) {
        //tìm vị trí index
        const index = todoArr.findIndex(
          (todoItem) =>
            //tìm ra đúng currentUser
            todoItem.owner === currentUser.username &&
            // tìm phần tử cha của thẻ span
            todoItem.task === span.parentElement.textContent.slice(0, -1)
        );
        // xóa
        todoArr.splice(index, 1);
        //lưu
        saveToStorage("todoArr", todoArr);
        // hiển thị lại todoList
        renderTodoList();
      }
    });
  });
}
