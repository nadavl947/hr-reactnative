class Post {
  constructor(
    id,
    companyId,
    userId,
    createDate,
    content,
    userDepartment,
    isPraivet,
    likedBy
  ) {
    this.id = id;
    this.companyId = companyId;
    this.userId = userId;
    this.createDate = createDate;
    this.content = content;
    this.userDepartment = userDepartment;
    this.isPraivet = isPraivet;
    this.likedBy = likedBy;
  }
}

export default Post;
