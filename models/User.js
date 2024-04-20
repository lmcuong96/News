"use strict";
// Class User đại diện thông tin người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    //để mặc định
    category = "sport",
    pageSize = 5
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    // dành cho bài 9
    this.category = category;
    this.pageSize = pageSize;
  }
}
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
