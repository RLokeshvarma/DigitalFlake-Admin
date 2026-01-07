import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../config/multer";

const router = Router();

router.post("/", authenticate, upload.single("image"), createCategory);
router.get("/", authenticate, getCategories);
router.put("/:id", authenticate, upload.single("image"), updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
