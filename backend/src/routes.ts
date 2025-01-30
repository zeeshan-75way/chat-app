import { Request, Router } from "express";
import userRoutes from "./users/user.routes";
import upload from "./common/middleware/multer";

const router = Router();

router.use("/users", userRoutes);
router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
});

export default router;
