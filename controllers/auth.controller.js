require("dotenv").config();
const Role = require('../models/User');
const jwt = require('jsonwebtoken');
const response = require('../libs/response');

const signUp = async (req, res) => {
  try {
    const { username,
            email,
            password,
            password_confirm
    } = req.body;

    const role = await Role.create({
        username,
        email,
        password: await Role.prototype.encryptPassword(password),
        password_confirm:  await Role.prototype.encryptPassword(password_confirm)
    }, {fields: [
        "username",
        "email",
        "password",
        "password_confirm"
      ]});

    const token = jwt.sign({ id: role.id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    response.success(req,res,{ token: token },200,"Succesfull registration");
  } catch (error) {
    response.error(req, res, "Unexpected error", 500, error);
  }
};

const signIn = async (req, res) => {
  const userFound = await Role.findOne({ where: { email: req.body.email } });

  if (!userFound) return response.error(req, res, "User not found", 400);

  const matchPassword = await Role.prototype.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return response.error(req, res, "Invalid password", 401, { token: null });

  const token = jwt.sign({ id: userFound.id }, process.env.SECRET, {
    expiresIn: 86400,
  });

  response.success(req, res, { token: token }, 200, "Succesfull login");
};

module.exports = {
  signUp,
  signIn
};
