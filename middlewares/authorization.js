import jwt from "jsonwebtoken";
import e from "express";

export default (req, res, next) => {
    try {
        console.log("----authorization----")
        const token = req.headers["auth-token"];
        if (!token) {
            res.status(401).send("You have no access")
        } else {
            jwt.verify(token, process.env.HASHED, (error, Token) => {
                if (error) {
                    return res.status(401).send(error)
                }
                req.user = Token
                next()
            })
        }
    } catch (e) {
        next(e)
    }
}