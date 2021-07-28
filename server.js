require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import {studentRouter, adminRouter, teacherRouter} from "./routers";
import cors from "cors";
import useragent from "express-useragent";
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';
import methodOverride from 'method-override';


const app = express();
app.use(express.json());
app.use(methodOverride('_method'));
mongoose.connect(
    process.env.DB_URL2,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => console.log("database connected...")
);
const conn = mongoose.createConnection(process.env.DB_URL2, {useNewUrlParser: true , useUnifiedTopology: true});
let gfs;
conn.once('open' ,() => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})
try {

//create storage engine
const storage =  new GridFsStorage({
    url: process.env.DB_URL2,
    options:{useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


app.post('/teacher/upload',upload.single('file'),(req,res,next)=>{
    res.json({file:req.file})
})
}catch (e) {
    console.log(e)
}
app.use(cors());
app.use(useragent.express());
app.use("/", [studentRouter, adminRouter, teacherRouter]);
app.use(errorHandler);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`up and running on port => ${port}`));
