import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/User';
import { sendWelcomeEmail } from '../utils/email';

// Input contracts validation schemas
const SignupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = SignupSchema.parse(req.body);

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ success: false, message: "Email is already registered" });
      return;
    }

    // Passwords hash automatically via the model's pre-save middleware hook now!
    const newUser = new User({ email, password });
    await newUser.save();

    // Fire welcome onboarding email
    await sendWelcomeEmail(email);

    res.status(201).json({ success: true, message: "User account created successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      // Using .issues resolves the type definition conflict
      res.status(400).json({ success: false, errors: zodError.issues });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error during account sign up." });
    }
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = SignupSchema.parse(req.body); // Re-use the schema validation

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    // Sign session with role metadata assignment
    const token = jwt.sign(
      { id: user._id, email: user.email, role: (user as any).role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // Secure cookie configuration storage implementation
    res.cookie('admin_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 calendar day
    });

   
    res.json({ 
      success: true, 
      message: "Login successful",
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      // Using .issues resolves the type definition conflict
      res.status(400).json({ success: false, errors: zodError.issues });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error during account login verification." });
    }
  }
};