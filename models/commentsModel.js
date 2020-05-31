class Comment {
  constructor(id, companyId, userId, postId, createDate, content) {
    this.id = id;
    this.companyId = companyId;
    this.userId = userId;
    this.postId = postId;
    this.createDate = createDate;
    this.content = content;
  }
}

export default Comment;
