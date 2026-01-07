import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import categoryRoutes from "./routes/category.routes";
import path from "path";
import subcategoryRoutes from "./routes/subcategory.routes";
import productRoutes from "./routes/product.routes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);


app.get("/", (_req, res) => {
  res.send("DigitalFlake Admin API is running");
});

const PORT = process.env.PORT || 5000;

import { db } from "./config/db";

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed", error);
  }
})();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
