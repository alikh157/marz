import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },

    studentPhoneNumber: {
        type: String,
        unique: true,
        required: true,
        minlength: 11,
        maxlength: 11
    },

    studentEmail: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 35

    },
})
studentSchema.post('save', (error, doc, next) => {
    (error.name === 'MongoError' && error.code === 11000) ? next(new JoiError("Unique Item StudentsDB", "Some of your value is repetitive", 44, 400, {
        "pointer": "/student/register",
        "parameter": "req.data"
    })) : next()
})
module.exports = mongoose.model("students", studentSchema)