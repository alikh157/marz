import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },

    studentFamily: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 35
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

    studentNationCode: {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 10

    },

    studentAddress: {
        type: String,
        maxlength: 120

    },

    studentAge: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },

    studentLevel: {
        type: String,
        minlength: 4
    },

    studentCourseID: {
        type: Array,
        ref: "courses"
    },

    studentPassword: {
        type: String,
        minlength: 8,

    },
    studentHashedPassword: {
        type: String,
        minlength: 8,

    },
})
studentSchema.post('save',(error,doc,next)=>{
    (error.name==='MongoError'&&error.code===11000)?next(new JoiError("Unique Item StudentsDB","Some of your value is repetitive",44,404,{"pointer":"/student/register","parameter":"req.data"})):next()
})
module.exports = mongoose.model("students", studentSchema)