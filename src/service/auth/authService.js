const Users = require("../../models/user");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const saveUser = async (userDetails) => {
  try {
    const { email, role_id } = userDetails;
    if(role_id == 1){
      throw new Error(ERROR_MESSAGE.UNAUTHORIZED_USER);
    }
    const isEmailPresent = await Users.findOne({ where: { email} });
    if (isEmailPresent) {
      throw new Error(ERROR_MESSAGE.EMAIL_ALREADY_EXIST);
    }
    const result = await Users.create(userDetails); // insert query
    return result;
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message);
  }
};

module.exports = { saveUser };
