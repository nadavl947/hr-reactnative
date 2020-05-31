import Event from '../models/eventModel';

export const EVENTS = [
    new Event(
        1,
        1,
        1,
        [1, 2, 5, 3, 4, 7],
        5,
        6,
        3,
        "Large meeting room",
        "Daily"
    ),
    new Event(
        2,
        1,
        2,
        [1, 2, 6],
        5,
        6,
        4,
        "Large meeting room",
        "New sprint meeting"
    ),
    new Event(
        3,
        1,
        1,
        [1, 2, 3],
        5,
        7,
        4,
        "Large meeting room",
        "Daily 2"
    ),
    new Event(
        4,
        2,
        1,
        [1, 2, 3, 9],
        5,
        7,
        4,
        "no place for me",
        "My Heritage",
    ),
]