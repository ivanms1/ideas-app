import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  ideas: string[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ideas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'idea'
    }
  ]
});

const User = model<IUser>('user', UserSchema);

export default User;
