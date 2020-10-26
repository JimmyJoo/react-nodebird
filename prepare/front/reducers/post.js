import shortId from 'shortid';

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
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [createDummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((p) => p.id !== action.id),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex(
        (p) => p.id === action.data.postId
      );
      const newPost = { ...state.mainPosts[postIndex] };
      newPost.Comments = [
        createDummyComment(action.data.content),
        ...newPost.Comments,
      ];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = newPost;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default post;
