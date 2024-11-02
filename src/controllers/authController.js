const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require("../utils/validations/authValidation");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const UserDto = require("../dtos/userDto");
const bcrypt = require("bcryptjs"); 

exports.registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exits" });
    }

    const user = new User({
      username,
      email,
      password,
      role: role || "user",
    });

    await user.save();

    const token = generateToken(user._id, user.role);

    const userDto = new UserDto(user);

    res.status(201).json({ token, user: userDto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    const userDto = new UserDto(user);

    res.status(201).json({ token, user: userDto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const userDto = new UserDto(user);

    res.status(200).json({ user: userDto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { error } = updateProfileValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.currentPassword && req.body.newPassword) {
      const isMatch = await user.matchPassword(req.body.currentPassword);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.newPassword, salt);
     
    }

    const updatedUser = await user.save();

    const userDto = new UserDto(updatedUser);

    const token = generateToken(updatedUser._id);

    res.status(200).json({
      user: userDto,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
