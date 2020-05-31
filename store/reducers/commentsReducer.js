import { COMMENTS } from '../../data/commentsData';

const initialState = {
    commentsList: COMMENTS
}

const commentsReducer = (state = initialState, action) => {
    return state;
}

export default commentsReducer;