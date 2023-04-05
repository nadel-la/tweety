const User = sequelize.define('User', { name: DataTypes.STRING });
const Comment = sequelize.define('Comment', { name: DataTypes.STRING });
const UserComments = sequelize.define('UserComments', {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // 'Movies' would also work
      key: 'id'
    }
  },
  CommentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Comment, // 'Actors' would also work
      key: 'id'
    }
  }
});
User.belongsToMany(Comment, { through: UserComments });
Comment.belongsToMany(User, { through: UserComments });