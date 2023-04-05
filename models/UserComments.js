module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { name: DataTypes.STRING });
  const Comment = sequelize.define('Comment', { name: DataTypes.STRING });

  const UserComments = sequelize.define('UserComments', {
    UserId: {
      type: sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    CommentId: {
      type: sequelize.INTEGER,
      references: {
        model: 'Comments',
        key: 'id'
      }
    }
  });

  User.belongsToMany(Comment, { through: UserComments });
  Comment.belongsToMany(User, { through: UserComments });

  return UserComments;
};
