import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500

    },
    answer1: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90

    },
    answer2: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90

    },
    answer3: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90

    },
    answer4: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90

    },
    correctAnswer: {
        type : Number ,
        required: true,
        min : 1,
        max : 4
    },





})
questionSchema.post('save',(error,doc,next)=>{
    (error.name==='MongoError'&&error.code===11000)?next(new JoiError("Unique Item AdminsDB","Some of your value is repetitive",44,404,{"pointer":"/admin/makeQuestion","parameter":"req.data"})):next()
})
module.exports = mongoose.model("questions", questionSchema);
