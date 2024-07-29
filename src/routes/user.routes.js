const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  login,
  updatePassword,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  createUserValidator,
  getUserByIdValidator,
  deleteUserByIdValidator,
  updateUserValidator,
  loginUserValidator,
} = require("../validators/user.validator");

router.post("/", createUserValidator, createUser);

router.get("/", authMiddleware, getAllUsers);

router.get("/:id", authMiddleware, getUserByIdValidator, getUserById);

router.patch("/:id", authMiddleware, updateUserValidator, updatePassword);

router.delete("/:id", authMiddleware, deleteUserByIdValidator, deleteUser);

router.post("/login", loginUserValidator, login);

module.exports = router;
