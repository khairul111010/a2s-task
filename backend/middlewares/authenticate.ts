import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        user?: string | object;
      }
    }
  }

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.replace('Bearer ', '');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ error });
    }
  };
  
export {authenticate}