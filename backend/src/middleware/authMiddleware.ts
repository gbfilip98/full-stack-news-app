import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken, verifyToken } from '../utils/token';
import { transporter } from '../config/mailer';

const frontendURL = process.env.FRONTEND_URL!;

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'Email already registered.' };

  const hashed = await hashPassword(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
  });

  const token = generateToken({ id: user._id });
  const verifyLink = `${frontendURL}/verify?token=${token}`;

  try {
    await transporter.sendMail({
      from: '"News App" <no-reply@newsapp.com>',
      to: email,
      subject: 'Verify your account',
      html: `<p>Please verify your email by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`,
    });
  } catch (err: unknown) {
      let errorMessage = "";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = 'Failed to send verification email.';
      }

      throw { status: 500, message: errorMessage };
  }

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = generateToken({ id: user._id });
  return { user, token };
};

export const verifyUserEmail = async (token: string) => {
  const decoded = verifyToken(token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) throw new Error('Invalid token');

  user.isVerified = true;
  await user.save();
  return user;
};