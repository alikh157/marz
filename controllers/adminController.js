import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/admins';
import TextLearn from "../models/textLearns";
import Slideshow from "../models/slideshows" ;
import Collaboration from "../models/collaborations" ;
import Question from "../models/questions" ;

export const adminLogin = (req, res, next) => {
    try {
        console.log("-----AdminLogin-----");
        Admin.findOne({adminUsername: req.body.adminUsername}, ((error, admin) => {
            error ? console.log(error) : admin ? bcrypt.compare(req.body.adminPassword, admin.adminHashedPassword, (error, result) => {
                error ? console.log(error) : result ? jwt.sign({_id: admin._id}, process.env.HASHED, {expiresIn: '20m'}, (error, token) => {
                    error ? console.log(error) : token ? res.header("auth-token", token).send(token) : console.log(token)
                }) : res.status(401).send("your username or password isn't correct")
            }) : res.status(401).send("you are not authorized!")
        }))
    } catch (e) {
        console.log(e)
    }
};


export const adminRegister = async (req, res, next) => {
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
            error ? next(error) : res.status(200).send({"message": "submitted!"})
        })
    } catch (e) {
        next(e)
    }
};


export const createTextLearn = async (req, res, next) => {
    try {
        console.log("-----NEW TEXT LEARN admin-----");
        const {
            title,
            body,
            date
        } = req.body

        TextLearn.create({
            title,
            body,
            date
        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}


export const getTextLearn = async (req, res, next) => {
    try {
        console.log("-----GET TEXT LEARN admin-----");
        const {
            query
        } = req.body;
        TextLearn.find({
                $or: [{body: {$regex: req.body.query, $options: 'i'}},
                    {title: {$regex: req.body.query, $options: 'i'}}]
            },
            (error, result) => {
                error ? next(error) : res.status(200).send(result)
            })
    } catch (e) {
        next(e)
    }
}


export const createSlideShow = async (req, res, next) => {
    try {
        console.log("----- NEW SLIDESHOW --------");
        const {
            title,
            body,
            date
        } = req.body
        Slideshow.create({
            title,
            body,
            date
        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}

export const getSlideShow = async (req, res, next) => {
    try {
        console.log("-----GET TEXT LEARN admin-----");
        Slideshow.find((error, result) => {
            error ? next(error) : res.status(200).send(result)
        })
    } catch (e) {
        next(e)
    }
}

export const createCollaboration = async (req, res, next) => {
    try {
        console.log("-------NEW Collaboration--------");
        const {
            name,
            description,
            date
        } = req.body
        Collaboration.create({
            name,
            description,
            date
        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}

export const getCollaboration = async (req, res, next) => {
    try {
        console.log("-------GET COLLABORATION admin-------");
        Collaboration.find((error, result) => {
            error ? next(error) : res.status(200).send(result)
        })
    } catch (e) {
        next(e)
    }
}
export const createquestion = async (req, res, next) => {
    try {
        console.log("-------NEW question--------");
        const {
            question,
            answer1,
            answer2,
            answer3,
            answer4,
            correctAnswer

        } = req.body

        Question.create({
            question,
            answer1,
            answer2,
            answer3,
            answer4,
            correctAnswer

        }, (error) => {
            error ? next(error) : res.status(200).send('ok')
        })
    } catch (e) {
        next(e)
    }
}

export const getQuestion = async (req, res, next) => {
    try {
        console.log("-------GET Question admin-------");
        const {number} = req.body
        const random = Math.floor(Math.random() * (number + 7));
        Question.find({}, (error, result) => {
            error ? next(error) : res.status(200).send(result)
        }).skip(random).limit(number)
    } catch (e) {
        next(e)
    }
}
