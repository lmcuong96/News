"use strict";
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const saveBtn = document.getElementById("btn-submit");

saveBtn.addEventListener("click", function () {
  const validate = validateData();
  if (validate) {
    //cập nhật lại currentUser
    currentUser.category = categoryInput.value;
    currentUser.pageSize = Number.parseInt(pageSizeInput.value);
    //Lưu lại
    saveToStorage("currentUser", currentUser);
    //cập nhật lại userArr
    // tìm vị trí index của currentUser trong userArr
    const index = userArr.findIndex(
      (userIndex) => userIndex.username === currentUser.username
    );
    // currentUser sẽ bằng với vị trí index trong userArr
    userArr[index] = currentUser;
    //Lưu lại setting của currentUser trong userArr
    saveToStorage("userArr", userArr);
    // thông báo thành công và xóa form
    alert("Thay đổi thành công");
    pageSizeInput.value = "";
    categoryInput.value = "";
  }
});

/**Hàm kiểm tra dữ liệu nhập */
function validateData() {
  let isValidate = true;
  // kiểm tra pageSize có hợp lệ không
  if (Number.isNaN(Number.parseInt(pageSizeInput.value))) {
    alert("News per page không hợp lệ. Vui lòng nhập lại");
    isValidate = false;
  }
  return isValidate;
}
