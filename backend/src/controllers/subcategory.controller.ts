import { Request, Response } from "express";
import { db } from "../config/db";

export const createSubcategory = async (req: Request, res: Response) => {
  const { name, category_id, status } = req.body;
  const image = req.file?.filename || null;

  try {
    await db.query(
      `INSERT INTO subcategories (name, category_id, image_url, status)
       VALUES (?, ?, ?, ?)`,
      [name, category_id, image, status || "ACTIVE"]
    );

    res.status(201).json({ message: "Subcategory created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create subcategory", error });
  }
};

export const getSubcategories = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*, c.name AS category_name
      FROM subcategories s
      JOIN categories c ON s.category_id = c.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subcategories", error });
  }
};

export const updateSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category_id, status } = req.body;
  const image = req.file?.filename;

  try {
    const query = image
      ? `UPDATE subcategories SET name=?, category_id=?, status=?, image_url=? WHERE id=?`
      : `UPDATE subcategories SET name=?, category_id=?, status=? WHERE id=?`;

    const values = image
      ? [name, category_id, status, image, id]
      : [name, category_id, status, id];

    await db.query(query, values);

    res.json({ message: "Subcategory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update subcategory", error });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM subcategories WHERE id = ?", [id]);
    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subcategory", error });
  }
};
