/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as services from '../services/index';

dotenv.config();

export const hashPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.first_name
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: '2hr',
    },
  );
  return token;
};

export const comparePassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
};

export const validatePassword = async (email, password) => {
  const user = await services.getAUserByEmail(email);

  if (user) {
    const isValid = await comparePassword(password, user.password);
    if (isValid) {
      const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.first_name,
      });
      return token;
    }
  }
  return false;
};