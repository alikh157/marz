import mongoose from "mongoose";
import JoiError from "../Exceptions/validationError";
const filesSchema=new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    fileType:{
        type:String,
        required:true,
    },
    fileOriginalName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    fileSize:{
        type:Number,
        required:true
    },
    fileFieldName:{
        type:String
    },
    fileUploadedAt:{
        type:Date,
        default:Date.now
    }
})
filesSchema.post('save', (error, doc, next) => {
    (error.name === 'MongoError' && error.code === 11000) ? next(new JoiError("Unique Item FilesDB", "Some of your value is repetitive", 44, 400, {
        "pointer": "/file/upload",
        "parameter": "req.data"
    })) : next()
})
export default mongoose.model("files",filesSchema);