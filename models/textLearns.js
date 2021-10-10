import mongoose from "mongoose";

const textLearnSchema = new mongoose.Schema({

    title:{
        type: String,
        required:true,
        minlength: 3
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


module.exports = mongoose.model("textLearns", textLearnSchema)
