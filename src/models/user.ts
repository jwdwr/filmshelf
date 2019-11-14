import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
});

export const User = model<IUser>("User", UserSchema);