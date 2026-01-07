import { Request, Response } from "express";
import { db } from "../config/db";

export const createCategory = async (req: Request, res: Response) => {
  const { name, status } = req.body;
  const image = req.file?.filename || null;

  try {
    await db.query(
      `INSERT INTO categories (name, image_url, status)
       VALUES (?, ?, ?)`,
      [name, image, status || "ACTIVE"]
    );

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const image = req.file?.filename;

  try {
    const query = image
      ? `UPDATE categories SET name=?, status=?, image_url=? WHERE id=?`
      : `UPDATE categories SET name=?, status=? WHERE id=?`;

    const values = image
      ? [name, status, image, id]
      : [name, status, id];

    await db.query(query, values);

    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
