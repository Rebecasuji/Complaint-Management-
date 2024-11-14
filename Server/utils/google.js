const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Load OAuth2 client credentials from the JSON file
const CLIENT_ID = '1068077476790-8j1ecuqkdh7fpd3sdkld8hfetnk32ct4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Replace with actual redirect
const REFRESH_TOKEN = '1//04AIH3hPfc1cNCgYIARAAGAQSNwF-L9IrsGichda5sS3yVd4-sVWyWI8OCfH_nqcSywkvpxi5L2VENShBiB7GVx5rENfTEftvhdk'; // We'll generate this token in the next step

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendPasswordResetEmail(toEmail, resetLink) {
  try {
    const accessToken = await oAuth2Client.getAccessToken(); // Get access token using OAuth2

    // Create a transporter object using Gmail and OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'your-email@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Email options
    const mailOptions = {
      from: 'Your App <your-email@gmail.com>',
      to: toEmail,
      subject: 'Password Reset Request',
      text: `Please use the following link to reset your password: ${resetLink}`,
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

module.exports = { sendPasswordResetEmail };
