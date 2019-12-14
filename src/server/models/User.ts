import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  address: string;
  email: string;
  name: string;
}

export const UserSchema = new Schema({
  address: {
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  name: {
    required: true,
    type: String,
    unique: true,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
