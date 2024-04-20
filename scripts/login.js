"use strict";
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

loginBtn.addEventListener("click", function () {
  // Kiểm tra dữ liệu người dùng nhập vào
  const isValidate = validateData();
  if (isValidate) {
    // Kiểm tra xem người dùng có nhập đúng username và password hay không
    //tìm kiếm user dựa trên username và password ng dùng nhập
    const user = userArr.find(
      (item) =>
        item.username === usernameInput.value &&
        item.password === passwordInput.value
    );
    // Nếu người dùng nhập đúng thì :
    if (user) {
      //Thông báo
      alert("Đăng nhập thành công");
      // Lưu thông tin
      saveToStorage("currentUser", user);
      //Quay về trang home
      window.location.href = "../index.html";
    } else {
      alert("Username hoặc mật khẩu bị sai! Vui lòng kiểm tra lại");
    }
  }
});
/**
 *
 * Hàm kiểm tra dữ liệu nhập
 */
const validateData = function () {
  let isValidate = true;
  if (usernameInput.value === "") {
    alert("Nhập tên người dùng");
    isValidate = false;
  }
  if (passwordInput.value === "") {
    alert("Nhập password");
    isValidate = false;
  }
  return isValidate;
};
