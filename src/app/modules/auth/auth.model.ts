import { model, Schema, Types } from 'mongoose';

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const verificationTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Auth = model('Auth', authSchema);

export const VerificationToken = model('VerificationToken', verificationTokenSchema);
