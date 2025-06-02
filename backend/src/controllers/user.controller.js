import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const { sign, verify } = jwt;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { credential } = req.body;
  console.log("test")
  console.log(credential)

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, email, name, picture });
      await user.save();
    }
    console.log(user)

    const token = sign({ userId: user._id, user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)
    res.json({ token, user });
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(400).json({ error: 'Authentication failed' });
  }
};
