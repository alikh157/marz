import dotenv from "dotenv";

dotenv.config();
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import {studentRouter, adminRouter} from "./routers";
import cors from "cors";
import useragent from "express-useragent";
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';
import methodOverride from 'method-override';


const app = express();
app.options('*', cors())
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(methodOverride('_method'));
mongoose.connect(
    process.env.DB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => console.log("database connected...")
);

app.use(useragent.express());
app.use("/", [studentRouter, adminRouter]);
app.use(errorHandler);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`up and running on port => ${port}`));
