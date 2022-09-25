import * as express from "express";
import { Collection } from "apps";
import { uploader, jwtAuthGuard } from "middleware";

const router = express.Router();
const upload = uploader(<file directory>);

router.post(
  "/",
  [
    jwtAuthGuard,
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      {
        name: "bgImage",
        maxCount: 1,
      },
    ]),
  ],
  Collection.add
);
