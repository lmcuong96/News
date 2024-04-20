"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");
const wellcomeMes = document.getElementById("welcome-message");
/**
 * Hiển thị màn hình Home
 */
function renderHome() {
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    wellcomeMes.textContent = `Wellcome ${currentUser.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
renderHome();

logoutBtn.addEventListener("click", function () {
  if (confirm("Bạn chắc chắn muốn logout?")) {
    // thoát khỏi currentUser
    currentUser = null;
    //Lưu lại dữ liệu
    saveToStorage("currentUser", currentUser);
    //Hiển thị lại trang web
    renderHome();
  } else {
    renderHome();
  }
});
