"use strict";
const queryInput = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");
const preBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const newContainer = document.getElementById("news-container");
const navPageNum = document.getElementById("nav-page-num");

let totalResults;
let keyword = "";

searchBtn.addEventListener("click", function () {
  //kiểm tra xem người dùng đã nhập từ khóa chưa, nếu chưa thì thông báo lỗi
  if (queryInput.value.trim() === "") {
    alert("Hãy nhập thông tin cần tìm kiếm");
    navPageNum.style.display = "none";
  } else {
    // gán keyword bằng với form nhập
    keyword = queryInput.value;
    //hiển thị nội dung
    getSearch(keyword, 1);
  }
});

/** tương tự getNews */
async function getSearch(keyword, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=82fe7b192f474c98a70f3df629511e29`
    );
    const data = await res.json();
    console.log(data);
    if (data.totalResults === 0) {
      navPageNum.style.display = "none";
      alert("Không có bài viết nào khả dụng");
    } else {
      navPageNum.style.display = "block";
      renderSearch(data);
    }
  } catch (error) {
    console.error(error);
  }
}

/**Kiểm tra điều kiện nút preview*/
function checkpreBtn() {
  //Nếu page = 1 thì ẩn nút
  if (pageNum.textContent == 1) {
    preBtn.style.display = "none";
    //Còn lại thì hiện nút
  } else {
    preBtn.style.display = "block";
  }
}
///////////////////////////////////////////
/**Kiểm tra điều kiện nút Next*/
function checknextBtn() {
  //Nếu page = làm tròn số (tổng các kết quả tìm được / số bài viết muốn hiển thị trong 1 trang)
  if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
    //Ví dụ : page = 14, totalResults = 67, pageSize = 4 thì :
    // 67/4 = 16.75 => làm tròn lên thành 17 =>  nếu page cũng bằng 17 thì sẽ ẩn nút Next đi vì đã ở trang cuối cùng
    nextBtn.style.display = "none";
  } else {
    //còn lại thì vẫn hiển thị nút next
    nextBtn.style.display = "block";
  }
}
/////////////////////////
/**  bắt sự kiện vào nút pre */
preBtn.addEventListener("click", function () {
  //gọi hàm lấy dữ liệu khi click vào nút pre thì số page sẽ trừ đi 1 đơn vị
  getSearch("us", --pageNum.textContent);
});
//////////////////////////
/**bắt sự kiện vào nút next*/
nextBtn.addEventListener("click", function () {
  //gọi hàm lấy dữ liệu khi click vào nút next thì số page sẽ cộng đi 1 đơn vị
  getSearch("us", ++pageNum.textContent);
});
//////////////////////////

/**Hàm hiển thị dữ liệu search */
function renderSearch(data) {
  //coi totalResults = tổng các kết quả trả về API
  totalResults = data.totalResults;
  //Kiểm tra điều kiện các nút
  checkpreBtn();
  checknextBtn();
  //Hiển thị dữ liệu
  newContainer.innerHTML = "";
  data.articles.forEach((article) => {
    const row = document.createElement("article");
    row.innerHTML = `
    <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${
                  article.urlToImage ? article.urlToImage : "/img/empty-img.jpg"
                }" class="card-img" alt="img">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.content}</p>
									<a href="${article.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
    `;
    newContainer.appendChild(row);
  });
}
