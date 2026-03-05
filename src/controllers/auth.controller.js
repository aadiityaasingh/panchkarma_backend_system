const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email, isActive: true })
    .select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });

});

module.exports = {
  login
};