import mongoose from "mongoose";

const collaborationSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength: 3
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mongoose.model("collaborations", collaborationSchema)
