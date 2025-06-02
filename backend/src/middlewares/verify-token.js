import jwt from 'jsonwebtoken';
const {verify, decode} = jwt

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  console.log(process.env.JWT_SECRET)
  console.log(decode(token))
  verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(user)
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
