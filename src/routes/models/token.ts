import { Document, Schema, Model, model, Error } from "mongoose";

export interface IToken extends Document {
  value: string,
  valid: boolean
}

export const tokenSchema: Schema = new Schema({
  value: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
  }
})

export const Token: Model<IToken> = model<IToken>("Token", tokenSchema)