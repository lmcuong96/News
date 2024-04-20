"use strict";
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
const registerBtn = document.getElementById("btn-submit");

registerBtn.addEventListener("click", function () {
  /**lấy dữ liệu nhập vào từ form*/
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value
  );
  /**kiểm tra dữ liệu nhập*/
  const validate = validateData(user);
  if (validate) {
    //đẩy dữ liệu vào trong userArr
    userArr.push(user);
    console.log(userArr);
    //lưu lại dữ liệu
    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công");
    //Chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});

/**
 * Hàm kiểm tra dữ liệu nhập */
const validateData = function (user) {
  let isValidate = true;
  //1. không bỏ trống thông tin
  if (user.firstname.trim() === "") {
    alert("Nhập tên");
    isValidate = false;
  } else if (user.lastname.trim() === "") {
    alert("Nhập họ");
    isValidate = false;
  } else if (user.username.trim() === "") {
    alert("Nhập tên người dùng");
    isValidate = false;
  }
  //2. không trùng username
  else if (
    !userArr.every((item) => (item.username !== user.username ? true : false))
  ) {
    alert("Username này đã tồn tại");
    isValidate = false;
  } else if (user.password === "") {
    alert("Nhập password");
    isValidate = false;
  } else if (confirmPasswordInput.value === "") {
    alert("Nhập lại password");
    isValidate = false;
  }
  //4. password phải lớn hơn 8 ký tự
  else if (user.password.length < 9) {
    alert("Password phải lớn hơn 8 ký tự");
    isValidate = false;
  }

  //3. password phải giống nhau
  if (user.password !== confirmPasswordInput.value) {
    alert("Password không giống nhau");
    isValidate = false;
  }
  return isValidate;
};
