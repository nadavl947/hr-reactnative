class Message {
  constructor(id, companyId, userId, chatId, timeAndData, contant, readById) {
    this.id = id;
    this.companyId = companyId;
    this.userId = userId;
    this.chatId = chatId;
    this.timeAndData = timeAndData;
    this.contant = contant;
    this.readById = readById;
  }
}

export default Message;
