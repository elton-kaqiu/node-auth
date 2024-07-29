const { where } = require("sequelize");
const { User, Role } = require("../configs/db.config");
const { hashPassword } = require("../helpers/password.helper");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/app.config");

const createUser = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  try {
    const { name, email, password, role_id = 1 } = req.body;
    const role = await Role.findByPk(role_id);
    if (!role) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: `Role with id: ${role_id} not found!` });
    }

    const existingUser = await User.findOne({
      where: { email },
      include: Role,
    });
    if (existingUser) {
      await transaction.rollback();
      return res.status(404).json({
        message: `User with this email: ${existingUser.email} exists!`,
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role_id,
      },
      { transaction }
    );

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: {
          id: role.id,
          name: role.name,
        },
      },
      jwtSecret,
      { expiresIn: `1h` }
    );
    await transaction.commit();

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: {
          id: role.id,
          name: role.name,
        },
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    await transaction.rollback();
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
