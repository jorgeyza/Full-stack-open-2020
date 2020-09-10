require('dotenv').config();

const { MONGODB_URI } = process.env;
const { PORT } = process.env;
const { JWT_SECRET } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
};
