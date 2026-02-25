const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const createUser = async(req,res) => {
    try {
    const { fullName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
}

module.exports = {
    createUser,
}