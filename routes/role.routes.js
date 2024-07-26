const express = require("express");
const router = express.Router();
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createRoleValidator,
  updateRoleValidator,
  getRoleByIdValidator,
  deleteRoleByIdValidator,
} = require("../validators/role.validator");

router.post("/", authMiddleware, createRoleValidator, createRole);

router.get("/", authMiddleware, getAllRoles);

router.get("/:id", authMiddleware, getRoleByIdValidator, getRoleById);

router.put("/:id", authMiddleware, updateRoleValidator, updateRole);

router.delete("/:id", authMiddleware, deleteRoleByIdValidator, deleteRole);

module.exports = router;
