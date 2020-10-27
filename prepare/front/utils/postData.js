import shortId from 'shortid';
import faker from 'faker';

export const generateFakePosts = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: Array(Math.floor(Math.random() * 5))
        .fill()
        .map(() => ({
          src: faker.image.image(),
        })),
      Comments: Array(Math.floor(Math.random() * 3))
        .fill()
        .map(() => ({
          id: shortId.generate(),
          User: {
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        })),
    }));

// dummyPost
export const createDummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'Jimmy Joo',
  },
  Images: [],
  Comments: [],
});

export const createDummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: shortId.generate(),
    nickname: 'Jimmy Joo',
  },
});
