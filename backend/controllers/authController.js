const db = require("../config/db");
const { user } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const randomstring = require("randomstring");
const sendMail = require("../utils/sendMail");

const registerUser = async (req, res) => {
  try {
    const { email, fullname, username, password } = req.body;
    let profile = req.file.filename;
    const allReadyExistUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!email && !fullname && !username && !password && !profile) {
      throw new Error("All fields are required");
    } else {
      if (allReadyExistUser) {
        throw new Error("User Already Exists");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const createNewuser = await user.create({
          email: email,
          fullname: fullname,
          username: username,
          password: hashPassword,
          profile: profile,
        });
        let users = await createNewuser.save();
        res.status(200).json({
          message: "user created successfully",
          user: users,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    let users = await user.findAll({});
    return res.status(200).json({
      user: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const users = await user.findOne({
        where: {
          email: email,
        },
      });
      if (users) {
        const IsMatch = await bcrypt.compare(password, users.password);
        if (email === users.email && IsMatch) {
          jwt.sign(
            { name:users.username,profile:users.profile ,id: users.id },
            process.env.jwtKey,
            { expiresIn: "24h" },
            (err, token) => {
              if (err) {
                res.send({ message: "Something went wrong, please try agin" });
              }
              res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
              });

              return res.status(200).json({
                message: "user login successfully",
                user: { user: users, token: token },
              });
            }
          );
        } else {
          res.send({ result: "User not found" });
        }
      } else {
        res.send({ result: "You are not register user" });
      }
    } else {
      res.send({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, cpassword, email } = req.body;
    const userData = await user.findOne({ email: email });
    const { id } = userData;
    if (password && cpassword) {
      if (password !== cpassword) {
        res.send({ message: "Password doesn't match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        let newPassword = await user.update(
          { password: newHashPassword },
          {
            where: {
              id: id,
            },
          }
        );
      }
    } else {
      res.send({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const userData = await user.findOne({ email: email });
  if (userData) {
    const randomToken = randomstring.generate();
    let users = await user.update(
      { token: randomToken },
      {
        where: {
          email: email,
        },
      }
    );
    sendMail(userData.fullName, userData.email, randomToken);
  } else {
    res.status(200).send({ message: "This email does not exist" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  resetPassword,
  forgotPassword,
};
