import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    facebookId: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
