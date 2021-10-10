import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const adminSchema = new mongoose.Schema({

    adminName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },
    adminUsername: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },

    adminFamily: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 35


    },

    adminPhoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 11,
        maxlength: 11
    },

    adminEmail: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 35
    },
    adminAge: {
        type: String,
        minlength: 2,
        maxlength: 2
    },
    adminPassword: {
        type: String,
        minlength: 8,
    },
    adminHashedPassword: {
        type: String,
        minlength: 8,
    },
})
adminSchema.post('save',(error,doc,next)=>{
    (error.name==='MongoError'&&error.code===11000)?next(new JoiError("Unique Item AdminsDB","Some of your value is repetitive",44,404,{"pointer":"/admin/register","parameter":"req.data"})):next()
})
module.exports = mongoose.model("admins", adminSchema);
