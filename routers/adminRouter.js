import express from 'express';
import {
    adminLogin,
    adminRegister,
    createTextLearn,
    getTextLearn,
    createSlideShow,
    getSlideShow,
    createCollaboration,
    getCollaboration,
    createquestion,
    getQuestion,
} from '../controllers/adminController';
import {
    adminLoginValidation,
    adminTextLearnValidation,
    slideShowValidation,
    collaborationValidation,
    questionValidation
} from "../middlewares/validation";
import {adminLoginSanitization} from "../middlewares/sanitization";
import authorization from "../middlewares/authorization";
import {GridFsStorage} from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import File from '../models/files'
import Grid from "gridfs-stream";

dotenv.config();

const router = new express.Router();
try {
    router.post('/admin/login', [adminLoginSanitization, adminLoginValidation], adminLogin);
    router.post('/admin/register', [authorization], adminRegister);
    router.post('/admin/new/textlearn', [authorization, adminTextLearnValidation], createTextLearn);
    router.post('/admin/get/textlearn', [authorization], getTextLearn);
    router.post('/admin/new/slideshow', [authorization, slideShowValidation], createSlideShow);
    router.post('/admin/get/slideshow', [authorization], getSlideShow);
    router.post('/admin/new/collaboration', [authorization, collaborationValidation], createCollaboration);
    router.post('/admin/get/collaboration', [authorization], getCollaboration);
    router.post('/admin/new/question', [authorization, questionValidation], createquestion);
    router.post('/admin/get/question', [authorization], getQuestion);

//create storage engine
    const conn = mongoose.createConnection(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    let gfs;
    conn.once('open', () => {
        //init stream
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    })
    const storage = new GridFsStorage({
        url: process.env.DB_URL,
        options: {useUnifiedTopology: true},
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
    const upload = multer({storage});

    router.post('/admin/upload', [authorization, upload.single('file')], (req, res, next) => {
        console.log("-------adminFileUploaded-------")
        const {fieldname, originalname, mimetype, filename, size} = req.file;
        File.create({
            fileName: filename,
            fileFieldName: fieldname,
            fileSize: size,
            fileOriginalName: originalname,
            fileType: mimetype
        }, (error) => {
            error ? next(error) : res.json({file: req.file})
        })
    })
router.post("/file/get", [authorization],(req,res,next)=>{
    gfs.files.findOne({filename: req.body.fileName}, (error, file) => {
        error ? next(error) : gfs.createReadStream(file.filename).pipe(res)
    })
})
} catch (error) {
    next(error)
}
export default router;
