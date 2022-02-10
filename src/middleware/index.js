import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'];
      if (!token) {
        return res.status(403).json({
          status: 'Forbidden',
          message: 'Access Denied',
        });
      }
  
      const tokenValidated = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = tokenValidated;
      return next();
    } catch (err) {
      return res.status(403).json({
        status: 'Failed',
        message: 'Unable to authenticate token.',
      });
    }
  };