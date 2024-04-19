import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, 'Email required !!!'],
    },
    password: {
      type: String,
      required: [true, 'Password required !!!'],
    },
    about: String,
    profileURL: String,
  },
  { timestamps: true }
);

export const User =
  mongoose.models.users || mongoose.model('users', UserSchema);
