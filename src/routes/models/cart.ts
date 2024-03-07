import { Document, Schema, Model, model, Error, Types } from "mongoose";
import { IProduct } from './product'

export interface productElement {
  product: IProduct,
  quantity: number,
  price: number,
}

export interface ICart extends Document {
  user: object,
  products: productElement[],
}

export const cartSchema: Schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
    },
  ],
},{ usePushEach: true },)

export const Cart: Model<ICart> = model<ICart>("Cart", cartSchema)