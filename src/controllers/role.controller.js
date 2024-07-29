const { where } = require("sequelize");
const { Role } = require("../configs/db.config");

const createRole = async (req, res, next) => {
  const transaction = await Role.sequelize.transaction();
  try {
    const { name } = req.body;
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: `Role with name: ${name} already exists!` });
    }
    const newRole = await Role.create({ name }, { transaction });
    await transaction.commit();
    res.status(201).json(newRole);
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: `Something went wrong while creating role!` });
    next(error);
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong while fetching roles!` });
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingRole = await Role.findOne({ where: { id } });
    if (!existingRole) {
      return res
        .status(404)
        .json({ message: `Role with id:${id} doesn't exist!` });
    }
    res.status(200).json(existingRole);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong while fetching a role!` });
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  const transaction = await Role.sequelize.transaction();
  try {
    const { id } = req.params;
    const { name } = req.body;
    const existingRole = await Role.findByPk(id);
    if (!existingRole) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: `Role with id:${id} does not exist!` });
    }
    const roleWithName = await Role.findOne(
      { where: { name } },
      { transaction }
    );
    if (roleWithName && roleWithName.id !== id) {
      await transaction.rollback();
      return res.status(400).json({ message: "Role name already exists" });
    }

    existingRole.name = name;
    await existingRole.save({ transaction });
    await transaction.commit();
    res.status(200).json(existingRole);
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: `Something went wrong while updating a role!` });
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  const transaction = await Role.sequelize.transaction();
  try {
    const { id } = req.params;
    const existingRole = await Role.findByPk(id);
    if (!existingRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    await existingRole.destroy({ transaction });

    await transaction.commit();
    res.status(200).json({ message: `Role deleted successfully!` });
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the role!" });
    next(error);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
