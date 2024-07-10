import { Request, Response } from "express";
import AuthService from "./AuthService";
import expressAsyncHandler from "express-async-handler";

// @desc Auth Registration
// route POST /api/v1/auth/register
// @access Public
export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await AuthService.register(username, email, password);
      res.status(201).json({status: "success", result: newUser});
    } catch (error) {
      res.status(500).json({status: "failed", error: "User registration failed" });
    }
  }
);


// @desc Auth Login
// route POST /api/v1/auth/login
// @access Public
export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login( email, password);
      res.status(200).json({status: "success", result: user});
    } catch (error) {
      res.status(500).json({status: "failed", error: "User registration failed" });
    }
  }
);
