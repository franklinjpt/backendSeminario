const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const roleSchema = sequelize.define('roles',
  {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
      type: Sequelize.STRING(75),
      unique: true,
    },
    email: {
      type: Sequelize.STRING(35),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    password_confirm: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'roles'
  }
);

roleSchema.prototype.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

roleSchema.prototype.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

module.exports = roleSchema;