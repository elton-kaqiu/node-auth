const { User } = require("../configs/db.config");

// Create and Save a new User
const createUser = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  try {
    const { name, email, password, role_id = 1 } = req.body;
    
  } catch (error) {
    await transaction.rollBack();
    res
      .status(500)
      .json({ message: `Something went wrong while registering the user!` });
    next(error);
  }
};

// Retrieve all Users
const getAllUsers = async (req, res, next) => {
  // Implementation here
};

// Retrieve a single User by ID
const getUserById = async (req, res, next) => {
  // Implementation here
};

// Update a User by ID
const updateUser = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  // Implementation here
};

// Delete a User by ID
const deleteUser = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  // Implementation here
};

// Login a User
const login = async (req, res, next) => {
  // Implementation here
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
