import { Request, Response } from "express";

export const getUsers = (req:Request, res:Response) => {
    return res.status(200).json({"result" : "GET ALL USERS"})
}