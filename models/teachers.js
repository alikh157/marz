import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },
    teacherUsername: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },
    teacherPassword: {
        type: String,
        required: true,
        minlength: 8,
    },
    teacherHashedPassword: {
        type: String,
        required: true,
        minlength: 8,
    },

    teacherFamily: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 35

    },

    teacherPhoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 11,
        maxlength: 11
    },

    teacherEmail: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 35

    },

    teacherNationCode: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10

    },

    teacherAddress: {
        type: String,
        maxlength: 120

    },

    teacherAge: {
        type: String,
        minlength: 2,
        maxlength: 2
    },

    teacherInfo: {
        type: String,
        required: true,
        minlength: 10

    },

    teacherCourseID: {
        type: Array,
        ref: "courses"
    },
    teacherContract: {}
})
teacherSchema.post('save',(error,doc,next)=>{
    (error.name==='MongoError'&&error.code===11000)?next(new JoiError("Unique Item TeachersDB","Your teacherEmail or teacherPhoneNumber is repetitive",44,404,{"pointer":"/teacher/register","parameter":"req.data.teacherPhoneNumber||req.data.teacherEmail"})):next()
})
module.exports = mongoose.model("teachers", teacherSchema)
