import * as path from "path";
import { mkdirSync, existsSync } from "fs";
import * as multer from "multer";

export const uploader = (targetDir: string) => {
  // Upload configuration
  const uploadsDir = path.resolve(__dirname, targetDir);

  const mkdir_recur = (targetDir) => {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : "";
    targetDir.split(sep).reduce((parentDir, childDir) => {
      const curDir = path.resolve(parentDir, childDir);
      console.log(`Dir Name: ${curDir}`);
      if (!existsSync(curDir)) {
        console.log("Created");
        mkdirSync(curDir);
      }

      return curDir;
    }, initDir);
  };

  if (!existsSync(uploadsDir)) {
    mkdir_recur(uploadsDir);
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

  const upload: multer.Instance = multer({ storage: storage });
  return upload;
};
