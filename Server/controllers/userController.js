const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err.message });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in', details: err.message });
  }
};

module.exports = { registerUser, loginUser };
