import Chat from "../models/departmentChatModal";

export const CHATS = [
  new Chat(1, 1, 1, [5], [5]),
  new Chat(2, 1, 2, [6], [6, 5]),
  new Chat(3, 1, 3, [1], [1, 5, 2, 3, 7, 8]),
  new Chat(4, 1, 4, [5], [5]),
  new Chat(5, 1, 5, [4], [4, 5]),
  new Chat(6, 1, 6, [5], [5]),
  new Chat(7, 2, 1, [12], [12]),
  new Chat(8, 2, 2, [], []),
  new Chat(9, 2, 3, [9], [9]),
  new Chat(10, 2, 4, [14], [14]),
  new Chat(11, 2, 5, [11], [11, 13]),
  new Chat(12, 2, 6, [10], [10]),
];
