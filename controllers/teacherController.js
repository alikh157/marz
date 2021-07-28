import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt' ;
import Admin from "../models/admins";

const Teacher = require('../models/teachers');


export const teacherLogin = (req, res, next) => {
    try {
        console.log("-----AdminLogin-----");
        Teacher.findOne({teacherUsername: req.body.teacherUsername}, ((error, admin) => {
            error ? console.log(error) : admin ? bcrypt.compare(req.body.teacherPassword, admin.teacherHashedPassword, (error, result) => {
                error ? console.log(error) : result ? jwt.sign({_id: admin._id}, process.env.HASHED, {expiresIn: '20m'}, (error, token) => {
                    error ? console.log(error) : token ? res.header("auth-token",token).send(token) : console.log(token)
                }) : res.status(401).send("your username or password isn't correct")
            }) : res.status(401).send("you are not authorized!")
        }))
    } catch (e) {
        console.log(e)
    }
}


export const teacherRegister = async (req, res, next) => {
    try {
        console.log("-----REGISTER-----");
        const {
            teacherName,
            teacherFamily,
            teacherPhoneNumber,
            teacherEmail,
            teacherNationCode,
            teacherPassword,
            teacherUsername,
            teacherAddress,
            teacherAge,
            teacherInfo,
            teacherCourseID,
        } = req.body
        const hash = await bcrypt.hash(teacherPassword, await bcrypt.genSalt(10))
        Teacher.create({
            teacherName,
            teacherFamily,
            teacherPhoneNumber,
            teacherEmail,
            teacherPassword,
            teacherHashedPassword: hash,
            teacherNationCode,
            teacherAddress,
            teacherUsername,
            teacherAge,
            teacherInfo,
            teacherCourseID,
        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}
