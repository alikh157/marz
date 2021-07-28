import mongoose from "mongoose" ;

const coursesSchema = new mongoose.Schema({

    courseName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },

    coursePrice: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 35


    },

    courseLevel: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 11


    },

    courseLanguage: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15

    },

    courseTeacher: {
        type: String,
        minlength: 2,
        maxlength: 2

    },
    courseSell:{
        Type:String,
        minlength:0
    },
    courseDate: {
        Type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("courses", coursesSchema);
