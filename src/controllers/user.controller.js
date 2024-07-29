const { where } = require("sequelize");
const { User, Role } = require("../configs/db.config");
const { hashPassword, comparePassword } = require("../helpers/password.helper");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/app.config");
const { name } = require("ejs");

const createUser = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  try {
    const { name, email, password, role_id = 8 } = req.body;
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

const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json(users);
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong while getting all users!` });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id: ${id} not found!` });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong while fetching a user!` });
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  try {
    const { id } = req.params;
    const { password } = req.body;

    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: `User with id: ${id} doesn't exist!` });
    }
    const hashedPassword = await hashPassword(password);
    existingUser.password = hashedPassword;
    await existingUser.save({ transaction });
    await transaction.commit();
    res.status(200).json({ message: `Password updated succesfully!` });
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: `Something went wrong while updating the password` });
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const transaction = await User.sequelize.transaction();
  try {
    const { id } = req.params;
    const existingUser = User.findByPk(id);
    if (!existingUser) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: `User with id: ${id} not found!` });
    }
    await existingUser.destroy({ transaction });
    await transaction.commit();
    res.status(204).json({ message: `User deleted successfully!` });
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: `Something went wrong while deleting a user!` });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      where: { email },
      include: Role,
    });

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: `User with email ${email} does not exist!` });
    }
    const isPasswordMatched = await comparePassword(
      password,
      existingUser.password
    );
    if (!isPasswordMatched) {
      return res.status(404).json({ message: `Incorrect password!` });
    }
    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.Role && existingUser.Role.name,
      },
      jwtSecret,
      { expiresIn: `1h` }
    );
    res.status(200).json({
      token,
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.Role && {
        id: existingUser.Role.id,
        name: existingUser.Role.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong while logging in` });
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updatePassword,
  deleteUser,
  login,
};
