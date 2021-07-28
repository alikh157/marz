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
export const teacherLoginValidation = (data, res, next) => {
    try {
        console.log("-----adminLoginValidation-----")
        const schema = Joi.object({
            teacherUsername: Joi.string().required().min(3),
            teacherPassword: Joi.string().required().min(8)
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
export const teacherRegisterValidation = (data, res, next) => {
    try {

        console.log("----teacherRegisterValidation----")
        const schema = Joi.object({
            teacherName: Joi.string().required().min(3),
            teacherEmail: Joi.string().required().min(3).email(),
            teacherUsername: Joi.string().required().min(3),
            teacherPassword: Joi.string().required().min(8),
            teacherFamily: Joi.string().required().min(3),
            teacherAddress: Joi.string().required().min(3),
            teacherInfo: Joi.string().required().min(3),
            teacherAge: Joi.string().required().max(3),
            teacherNationCode: Joi.string().required().max(10).min(10),
            teacherPhoneNumber: Joi.string().required().min(11).max(11)
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
        next(e);
    }
}

