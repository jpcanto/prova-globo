import { Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  inclusionDate: { type: String, required: true },
  alterationDate: { type: String, required: true },
  rules: { type: String, required: true },
  status: { type: String, required: true },
  show: { type: Boolean, required: true }
});

export default model('User', UserSchema);
