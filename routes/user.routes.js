const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
// Create a new User
router.post("/", userController.createUser);

// Retrieve all Users
router.get("/", authMiddleware, userController.getAllUsers); // Protect with authMiddleware if needed

// Retrieve a single User by ID
router.get("/:id", authMiddleware, userController.getUserById); // Protect with authMiddleware if needed

// Update a User by ID
router.put("/:id", authMiddleware, userController.updateUser); // Protect with authMiddleware if needed

// Delete a User by ID
router.delete("/:id", authMiddleware, userController.deleteUser); // Protect with authMiddleware if needed

// Login a User
router.post("/login", userController.loginUser);

module.exports = router;
