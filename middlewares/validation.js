import Joi from 'joi';
import JoiError from "../Exceptions/validationError";

export const adminLoginValidation = (data, res, next) => {
    try {
        console.log("-----adminLoginValidation-----")
        const schema = Joi.object({
            adminUsername: Joi.string().required().min(3),
            adminPassword: Joi.string().required().min(8)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["kh444"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}

export const studentRegisterValidation = (data,res,next) => {
    try {
        console.log("----------studentRegisterValidation-------------");
        const schema = Joi.object({
            studentName: Joi.string().min(3).max(30).required(),
            studentPhoneNumber: Joi.string().min(11).max(11).required(),
            studentEmail: Joi.string().min(10).max(35).required().email(),
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}

export const adminTextLearnValidation = (data,res,next) => {
    console.log("----------teacher TextLearn Validation-------------");
    try {
        const schema = Joi.object({
            title:Joi.string().min(3).required(),
            body:Joi.string().required(),
            date:Joi.date()
        });

        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}



export const slideShowValidation = (data,res,next) => {
    console.log("----------SLIDESHOW Validation-------------");
    try {
        const schema = Joi.object({
            title:Joi.string().min(3).required(),
            body:Joi.string().required(),
            date:Joi.date()
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}



export const collaborationValidation = (data,res,next) => {
    console.log("----------COLLABORATION Validation-------------");
    try {
        const schema = Joi.object({
            name:Joi.string().min(3).required(),
            description:Joi.string(),
            date:Joi.date()
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}

export const questionValidation = (data,res,next) => {
    console.log("----------QUESTION Validation-------------");
    try {
        const schema = Joi.object({
            question:Joi.string().min(3).max(500).required(),
            answer1:Joi.string().min(3).max(90).required(),
            answer2:Joi.string().min(3).max(90).required(),
            answer3:Joi.string().min(3).max(90).required(),
            answer4:Joi.string().min(3).max(90).required(),
            correctAnswer:Joi.number().min(1).max(4).required()
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["ma444"]}
        )) : next();
    } catch (e) {
        next(e)
    }

}

