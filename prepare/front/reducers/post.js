// actiion types
const ADD_POST = 'post/ADD_POST';

// action creator
export const addPost = () => ({ type: ADD_POST });

// dummyPost
const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: 'JimmyJoo',
  },
  content: '두 번째 게시글 #더미포스트',
  Images: [],
  Posts: [],
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
  postAdded: false,
};

// reducer
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default post;
