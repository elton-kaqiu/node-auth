// const express = require("express");
// const router = express.Router();
// const roleController = require("../controllers/role.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); // If you have authentication middleware

// // Create a new Role
// router.post("/", authMiddleware, roleController.createRole);

// // Retrieve all Roles
// router.get("/", authMiddleware, roleController.getAllRoles); // Protect with authMiddleware if needed

// // Retrieve a single Role by ID
// router.get("/:id", authMiddleware, roleController.getRoleById); // Protect with authMiddleware if needed

// // Update a Role by ID
// router.put("/:id", authMiddleware, roleController.updateRole); // Protect with authMiddleware if needed

// // Delete a Role by ID
// router.delete("/:id", authMiddleware, roleController.deleteRole); // Protect with authMiddleware if needed

// module.exports = router;
