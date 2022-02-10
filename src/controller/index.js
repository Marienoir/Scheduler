import * as services from '../services/index';
import * as utils from '../utils';

export const createNewUser = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await services.createUser(body);

    return res.status(201).json({
      code: 201,
      message: 'User created successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await utils.validatePassword(email, password);

    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    } else {
      res.status(200).json({
        message: 'Login successful',
        token
      });
    }
  } catch (error) {
    next(error);
  }
};
export const createNewSchedule = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { body } = req;
      req.body.email = email;
      const data = await services.createSchedule(body);
  
      res.status(201).json({
        code: 201,
        message: 'Schedule created successfully',
        data,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  };