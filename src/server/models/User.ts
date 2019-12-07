import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
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
