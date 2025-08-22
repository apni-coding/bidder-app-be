const Users = require("../../models/user");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const findUserById = async (userId) => {
  try {
    const user = await Users.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password", "verify_account_token", "verify_account_expires"],
      },
    });
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserById = async (updateData) => {
  try {
    const { userId } = updateData;

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    // update fields
    await user.update(updateData);

    // exclude sensitive data
    const updatedUser = await Users.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password", "verify_account_token", "verify_account_expires"],
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    // Sequelize soft delete (sets deleted_at)
    await user.destroy();

    return { id: userId, deleted: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { findUserById, updateUserById, deleteUserById };
