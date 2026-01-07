import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../config/multer";

const router = Router();

router.post("/", authenticate, upload.single("image"), createProduct);
router.get("/", authenticate, getProducts);
router.put("/:id", authenticate, upload.single("image"), updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
