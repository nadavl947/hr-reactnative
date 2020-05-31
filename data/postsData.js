import Post from '../models/postsModel';

export const POSTS = [
    new Post(
        1,
        1,
        1,
        new Date(2020, 2, 24, 10, 33, 30, 0).toISOString(),
        "Hi everybody! Waiting to see you all very soon!!!",
        3,
        false,
        []
    ),
    new Post(
        2,
        1,
        2,
        new Date(2020, 3, 25, 9, 22, 30, 0).toISOString(),
        "Happy Birth Day!!!",
        3,
        false,
        [1, 3]
    ),
    new Post(
        3,
        1,
        3,
        new Date(2020, 2, 25, 9, 22, 30, 0).toISOString(),
        "Sending you a nice new data base at: https://www.latlong.net/",
        3,
        false,
        [1, 4, 5]
    ),
    new Post(
        4,
        1,
        2,
        new Date(2020, 2, 11, 7, 32, 30, 0).toISOString(),
        "Dayli start at 11",
        3,
        true,
        [2]
    ),
    new Post(
        5,
        1,
        6,
        new Date(2020, 2, 25, 9, 22, 30, 0).toISOString(),
        "Tommorow I hope to see EVERYBODY back in the office!",
        6,
        false,
        [1, 2, 3, 4, 5, 6]
    ),
    new Post(
        6,
        2,
        9,
        new Date(2020, 2, 25, 9, 22, 30, 0).toISOString(),
        "Tommorow I hope to see EVERYBODY back in the office!",
        3,
        false,
        [10, 12]
    ),
    new Post(
        7,
        2,
        10,
        new Date(2020, 2, 25, 9, 20, 30, 0).toISOString(),
        "Great Day",
        4,
        false,
        [10, 12, 14]
    ),
    new Post(
        8,
        2,
        12,
        new Date(2020, 2, 25, 9, 10, 30, 0).toISOString(),
        "See you all Soon",
        4,
        false,
        [10, 12, 14, 9, 11, 13]
    ),
]