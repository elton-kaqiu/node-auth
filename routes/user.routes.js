const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
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

router.put("/:id", authMiddleware, updateUserValidator, updateUser);

router.delete("/:id", authMiddleware, deleteUserByIdValidator, deleteUser);

router.post("/login", loginUserValidator, login);

module.exports = router;
