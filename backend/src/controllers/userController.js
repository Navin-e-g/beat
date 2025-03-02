import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log to check request body
    console.log("Signup request received:", req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Create and save a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    console.log("User created successfully:", user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log to check request body
    console.log("Login request received:", req.body);

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid email:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for email:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log("Login successful for user:", email);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
