import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check_body } from "./check_body";

export const check_login = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (token === null || token == undefined)
        return res.status(401).json({ msg: "No token, authorization denied" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).send({ msg: "Token is not valid" });
        }
        if (check_body(["id", "mail", "time"], user as jwt.JwtPayload) != "") {
            return res.status(401).send({ msg: "Token is not valid" });
        }
        req.body.user = user;
        next();
    });
};
