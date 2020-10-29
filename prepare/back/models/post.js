module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {},
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );

  Post.associate = (db) => {};
  return Post;
};
