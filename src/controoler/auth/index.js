const authService = require("../../service/auth/authService");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const userInfo = await authService.saveUser(req.body);
    res.send(userInfo);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { registerUser };

// {
//     first_name: 'vivek',
//     last_name: 'verma',
//     email: 'email@gmail.com',
//     password: 'Admin@123'
// }
