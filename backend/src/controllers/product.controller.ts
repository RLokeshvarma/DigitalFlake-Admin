import { Request, Response } from "express";
import { db } from "../config/db";

export const createProduct = async (req: Request, res: Response) => {
  const { name, category_id, subcategory_id, status } = req.body;
  const image = req.file?.filename || null;

  try {
    await db.query(
      `INSERT INTO products (name, category_id, subcategory_id, image_url, status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category_id, subcategory_id, image, status || "ACTIVE"]
    );

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.*,
        c.name AS category_name,
        s.name AS subcategory_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN subcategories s ON p.subcategory_id = s.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category_id, subcategory_id, status } = req.body;
  const image = req.file?.filename;

  try {
    const query = image
      ? `UPDATE products SET name=?, category_id=?, subcategory_id=?, status=?, image_url=? WHERE id=?`
      : `UPDATE products SET name=?, category_id=?, subcategory_id=?, status=? WHERE id=?`;

    const values = image
      ? [name, category_id, subcategory_id, status, image, id]
      : [name, category_id, subcategory_id, status, id];

    await db.query(query, values);

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
