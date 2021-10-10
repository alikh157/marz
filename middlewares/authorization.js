import jwt from "jsonwebtoken";
import validationError from '../Exceptions/validationError'
export default (req, res, next) => {
    try {
        console.log("----authorization----")
        const token = req.headers["auth-token"];
        if (!token) {
           return res.status(401).send(new validationError("TokenError","Your token is not  authorized!",41,401,{ pointer: req.path, parameter: 'data.token' }))
        } else {
            jwt.verify(token, process.env.HASHED, (error, Token) => {
                if (error) {
                    next(new validationError("TokenError","Your token is not  authorized!",41,401,{ pointer: req.path, parameter: 'data.token' }))
                }
                req.user = Token
                next()
            })
        }
    } catch (e) {
        next(e)
    }
}






