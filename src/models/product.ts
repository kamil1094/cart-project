import { Document, Schema, Model, model, Error } from "mongoose";

export interface IProduct extends Document {
  name: string,
  price: number,
  image: string,
}

export const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
})

export const Product: Model<IProduct> = model<IProduct>("Product", productSchema)