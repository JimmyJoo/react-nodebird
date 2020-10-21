// actiion types
export const ADD_POST = 'post/ADD_POST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const ADD_COMMENT = 'post/ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

// action creator
export const addPost = (data) => ({ type: ADD_POST, data });

export const addComment = (data) => ({ type: ADD_COMMENT, data });

// dummyPost
const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: 'JimmyJoo',
  },
  content: '두 번째 게시글 #더미포스트',
  Images: [],
  Comments: [],
};

// initialState
const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
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
          User: {
            nickname: '한슬',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
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
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
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
