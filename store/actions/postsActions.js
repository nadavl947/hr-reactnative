import * as actionsType from "./actionsType";

const getPostsHandler = (companyId) => ({ type: actionsType.GET_POSTS, companyId })
const likePostHandler = (data) => ({ type: actionsType.HANDLE_LIKE_POST, data });
const createPost = (data) => ({ type: actionsType.CREATE_NEW_POST, data });

export const getCompanyPosts = companyId => async dispatch => {
  dispatch(getPostsHandler(companyId))
}

export const handleLikeAction = (postId, userId) => (dispatch) => {
  const data = { postId, userId };
  dispatch(likePostHandler(data));
};

export const createPostAction = (userData, postContent) => (dispatch) => {
  const data = { userData, postContent };
  dispatch(createPost(data));
};
