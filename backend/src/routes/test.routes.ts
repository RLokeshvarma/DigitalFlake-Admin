import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You have access",
    admin: (req as any).admin,
  });
});

export default router;
