import type { TLogin, TRegister, TVerify } from './auth.validation';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Auth, VerificationToken } from './auth.model';
import { sendEmail } from '../../utils/sendEmail';

// register
const register = async (payload: TRegister) => {
  // check existing user
  const isUserExists = await Auth.findOne({
    email: payload.email,
  });

  if (isUserExists) {
    throw new Error('User already exists');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // generate token
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // create user
  const user = await Auth.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  });

  // save token
  await VerificationToken.create({
    token: verificationToken,
    userId: user._id,
  });

  // verify link
  const verifyLink = `http://localhost:5000/api/v1/auth/verify?token=${verificationToken}`;

  // send email
  await sendEmail({
    to: user.email,
    subject: 'Verify your Rise Commerce account',
    html: `
      <h2>Welcome to Rise Commerce</h2>
      <p>Please verify your account by clicking the link below:</p>
      <a href="${verifyLink}">Verify Account</a>
    `,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

// verify token
const verify = async (payload: TVerify) => {
  const tokenData = await VerificationToken.findOne({
    token: payload.token,
  });

  if (!tokenData) {
    throw new Error('Invalid verification token');
  }

  const verifiedUser = await Auth.findByIdAndUpdate(
    tokenData.userId,
    {
      isVerified: true,
    },
    {
      new: true,
      select: 'name email isVerified',
    },
  );

  await VerificationToken.findByIdAndDelete(tokenData._id);

  return verifiedUser;
};

// login
const login = async (payload: TLogin) => {
  const user = await Auth.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email before login');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Invalid password');
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  };
};

export const AuthService = {
  register,
  verify,
  login,
};
