import mongoose from "mongoose";

const slideShowSchema= new mongoose.Schema({

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


module.exports = mongoose.model("slideShows", slideShowSchema)
