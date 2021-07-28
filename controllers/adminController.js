import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/admins';


export const adminLogin = (req, res, next) => {
    try {
        console.log("-----AdminLogin-----");
        Admin.findOne({adminUsername: req.body.adminUsername}, ((error, admin) => {
            error ? console.log(error) : admin ? bcrypt.compare(req.body.adminPassword, admin.adminHashedPassword, (error, result) => {
                error ? console.log(error) : result ? jwt.sign({_id: admin._id}, process.env.HASHED, {expiresIn: '20m'}, (error, token) => {
                    error ? console.log(error) : token ? res.header("auth-token",token).send(token) : console.log(token)
                }) : res.status(401).send("your username or password isn't correct")
            }) : res.status(401).send("you are not authorized!")
        }))
    } catch (e) {
        console.log(e)
    }
};


export const  adminRegister = async (req, res, next) => {
    try {
        console.log("-----AdminRegister-----");
        const {
            adminName,
            adminUsername,
            adminFamily,
            adminPhoneNumber,
            adminEmail,
            adminPassword,
            adminAge
        } = req.body;
        const HashedPassword = await bcrypt.hash(adminPassword, await bcrypt.genSalt(10));
        Admin.create({
            adminName,
            adminUsername,
            adminFamily,
            adminPassword,
            adminHashedPassword: HashedPassword,
            adminPhoneNumber,
            adminEmail,
            adminAge
        }, (error) => {
            error ? next(error) : res.status(200).send("submitted!")
        })
    } catch (e) {
        next(e)
    }
};
