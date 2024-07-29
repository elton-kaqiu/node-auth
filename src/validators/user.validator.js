const { body, param, validationResult } = require("express-validator");

const createUserValidator = [
  body("name")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters long"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateUserValidator = [
  param("id").isInt().withMessage("User ID must be an integer"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const getUserByIdValidator = [
  param("id").isInt().withMessage("User ID must be an integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const deleteUserByIdValidator = [
  param("id").isInt().withMessage("User ID must be an integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const loginUserValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required"),

  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  getUserByIdValidator,
  deleteUserByIdValidator,
  loginUserValidator,
};
