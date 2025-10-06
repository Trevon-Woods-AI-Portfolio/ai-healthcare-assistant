import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js";

const signup = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    generateTokenAndCookie(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
        firstLogin: true,
      },
    });
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in signup:", error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.firstLogin === true) {
        user.firstLogin = false;
        await user.save();
    }

    generateTokenAndCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        firstLogin: user.firstLogin,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in login:", error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in logout:", error);
  }
};

export { signup, login, logout };
