import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  auth: (password: string, email: string) => boolean
}

export const userSchema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.pre<IUser>("save", function save(next) {
  try {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    return next()
  } catch (err) {
    return next(err)
  }
});

userSchema.methods.auth = async function(password: string, email: string) {
  return bcrypt.compareSync(password, this.password) && email === this.email
}

export const User: Model<IUser> = model<IUser>("User", userSchema)