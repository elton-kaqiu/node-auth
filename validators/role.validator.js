const { body, param, validationResult } = require("express-validator");

const createRoleValidator = [
  body("name")
    .isString()
    .withMessage(`Role name must be string!`)
    .isUppercase()
    .withMessage(`Role name should be uppercase!`)
    .notEmpty()
    .withMessage(`Role name is required!`)
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const updateRoleValidator = [
  param("id").isInt().withMessage("Role ID must be an integer"),
  body("name")
    .optional()
    .isUppercase()
    .withMessage(`Role name should be uppercase!`)
    .isString()
    .withMessage("Role name must be a string")
    .notEmpty()
    .withMessage("Role name cannot be empty")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const getRoleByIdValidator = [
  param("id").isInt().withMessage("Role ID must be an integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const deleteRoleByIdValidator = [
  param("id").isInt().withMessage("Role ID must be an integer").toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  createRoleValidator,
  updateRoleValidator,
  getRoleByIdValidator,
  deleteRoleByIdValidator,
};
