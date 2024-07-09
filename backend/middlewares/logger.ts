import { NextFunction, Request, Response } from "express";
import { red, green, yellow, yellowBright } from 'console-log-colors';

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const method = req.method
    let colored = method
    switch (method) {
        case "GET":
            colored = green(method)  
            break;
        case "POST":
            colored = yellowBright(method)  
            break;
        case "PUT":
            colored = yellow(method)  
            break;
        case "DELETE":
            colored = red(method)  
            break;
        default:
            break;
    }
    console.log(`${new Date().toUTCString()} - [${colored}] ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

export default logger