import { Router } from "express";
import {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../config/multer";

const router = Router();

router.post("/", authenticate, upload.single("image"), createSubcategory);
router.get("/", authenticate, getSubcategories);
router.put("/:id", authenticate, upload.single("image"), updateSubcategory);
router.delete("/:id", authenticate, deleteSubcategory);

export default router;
