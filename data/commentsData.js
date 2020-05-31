import Comment from "../models/commentsModel";

export const COMMENTS = [
  new Comment(
    1,
    1,
    1,
    4,
    new Date(2020, 3, 25, 9, 22, 30, 0).toISOString(),
    "See you there!"
  ),
  new Comment(
    2,
    1,
    1,
    3,
    new Date(2020, 3, 25, 19, 22, 30, 0).toISOString(),
    "Thanks!!"
  ),
  new Comment(
    3,
    1,
    1,
    3,
    new Date(2020, 3, 25, 9, 12, 30, 0).toISOString(),
    "Thank you for sharing!"
  ),
  new Comment(
    4,
    2,
    9,
    8,
    new Date(2020, 3, 25, 9, 12, 30, 0).toISOString(),
    "Thank you for sharing!"
  ),
];
