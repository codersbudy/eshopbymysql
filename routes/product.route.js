import express from "express";
import { addProductPage, save, saveProduct ,viewProduct} from "../controller/product.controller.js";
import { verify } from "../middleware/authenticate.js";
import multer from "multer";

const upload = multer({dest: "public/images/"});

const router  = express.Router();
router.get("/add",verify, addProductPage);
router.get("/view/:id",viewProduct);
router.get("/view",viewProduct);

//router.post("/save", upload.single("image") ,verify, save);
router.post("/save",saveProduct);
export default router;