import { POSTS } from "../../data/postsData";
import Post from "../../models/postsModel";
import * as actionTypes from "../actions/actionsType";

const intialState = {
  postsList: [],
};

const fetchCompanyPosts = (state, action) => {
  const { companyId } = action;
  const filterPostsList = POSTS.filter(item => item.companyId === companyId)
  return {
    ...state,
    postsList: filterPostsList
  }
}

const handleLikeClick = (state, action) => {
  const { data } = action;
  let newArray = [...state.postsList];

  newArray.forEach((item) => {
    if (item.id === data.postId) {
      let likesList = item.likedBy;

      if (likesList.includes(data.userId)) {
        likesList = likesList.filter((item) => item !== data.userId);
      } else {
        likesList.push(data.userId);
      }
      item.likedBy = likesList;
    }
  });

  return {
    ...state,
    postsList: newArray,
  };
};

const addNewPost = (state, action) => {
  const { postContent, userData } = action.data;
  let newArray = [...state.postsList];
  const newPost = new Post(
    new Date().toString(),
    userData.companyId,
    userData.id,
    new Date().toString(),
    postContent,
    userData.department,
    false,
    []
  );
  return {
    ...state,
    postsList: [newPost, ...newArray]
  };
};

const postsReduer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return fetchCompanyPosts(state, action);
    case actionTypes.HANDLE_LIKE_POST:
      return handleLikeClick(state, action);
    case actionTypes.CREATE_NEW_POST:
      return addNewPost(state, action);
    default:
      return state;
  }
};

export default postsReduer;
