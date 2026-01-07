import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db";


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};


import { generateOtp } from "../utils/otp";
import { transporter } from "../utils/mailer";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const [admins]: any = await db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (!admins.length) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await db.query(
      `INSERT INTO password_otps (email, otp_hash, expires_at)
       VALUES (?, ?, ?)`,
      [email, otpHash, expiresAt]
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DigitalFlake Admin - Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};


export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const [rows]: any = await db.query(
      `SELECT * FROM password_otps
       WHERE email = ? AND is_used = false
       ORDER BY created_at DESC LIMIT 1`,
      [email]
    );

    if (!rows.length) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const record = rows[0];

    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isValid = await bcrypt.compare(otp, record.otp_hash);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error });
  }
};


export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  try {
    const [rows]: any = await db.query(
      `SELECT * FROM password_otps
       WHERE email = ? AND is_used = false
       ORDER BY created_at DESC LIMIT 1`,
      [email]
    );

    if (!rows.length) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const record = rows[0];
    const isValid = await bcrypt.compare(otp, record.otp_hash);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE admins SET password_hash = ? WHERE email = ?",
      [hashedPassword, email]
    );

    await db.query(
      "UPDATE password_otps SET is_used = true WHERE id = ?",
      [record.id]
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Password reset failed", error });
  }
};

