'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail)
      User.hasMany(models.Tweet)
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((data, options) => {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);

    data.password = hash
  })
  return User;
};