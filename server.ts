import * as express from "express";
import * as path from "path";
import * as multer from "multer";
import { mkdirSync, existsSync } from "fs";
import { MulterRequest } from "/types";


// Upload configuration
const uploadsDir = path.resolve(__dirname, "uploads");

if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir);
}

let storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
  },
});

let upload: multer.Instance = multer({ storage: storage });

export let uploadRouter = express.Router();

uploadRouter.post(
  "/upload",
  upload.any(),
  (req: MulterRequest, res: express.Response) => {
    console.log("upload param>>", req.body);
    res.status(200).json(req.files);
  }
);
