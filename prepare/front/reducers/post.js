import shortId from 'shortid';
import produce from 'immer';

// actiion types
export const ADD_POST = 'post/ADD_POST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const REMOVE_POST = 'post/REMOVE_POST';
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

export const ADD_COMMENT = 'post/ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

// action creator
export const addPost = (data) => ({ type: ADD_POST, data });

export const removePost = (id) => ({ type: REMOVE_POST, id });

export const addComment = (data) => ({ type: ADD_COMMENT, data });

// dummyPost
const createDummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'Jimmy Joo',
  },
  Images: [],
  Comments: [],
});

const createDummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: shortId.generate(),
    nickname: 'Jimmy Joo',
  },
});
// initialState
const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'JimmyJoo',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src:
            'https://image.shutterstock.com/image-photo/mountain-valley-during-sunrise-natural-600w-1668334120.jpg',
        },
        {
          src:
            'https://image.shutterstock.com/image-photo/mountain-valley-during-sunrise-natural-600w-1668334120.jpg',
        },
        {
          src:
            'https://image.shutterstock.com/image-photo/mountain-valley-during-sunrise-natural-600w-1668334120.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            nickname: '한슬',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          id: shortId.generate(),
          User: {
            nickname: '주',
          },
          content: '헬로우~',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

// reducer
const post = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(createDummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = state.mainPosts.filter((p) => p.id !== action.id);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const newPost = draft.mainPosts.find(
          (p) => p.id === action.data.postId
        );
        newPost.Comments.unshift(createDummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        return state;
    }
  });

export default post;
