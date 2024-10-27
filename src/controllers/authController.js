const {
  registerValidation,
  loginValidation,
} = require("../utils/validations/authValidation");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const UserDto = require("../dtos/userDto");

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
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
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
