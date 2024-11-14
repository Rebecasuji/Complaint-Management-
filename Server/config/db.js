const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sathivelsurekha:rDqetLXSjI1vVAuE@cluster0.tstau.mongodb.net/MERNLoginGoogle?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
