// POST: /reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Find the user by reset token and ensure the token hasn't expired
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the user's password and clear the reset token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  