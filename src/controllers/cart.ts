import { NextFunction, Request, Response } from "express";

import { User, IUser } from "../models/user";
import { Cart, ICart, productElement } from "../models/cart";
import { Product, IProduct } from "../models/product";

export class CartController {
  public async addProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const productId = req.params.productId;
      const quantity = req.query.quantity || 1;
      const user: IUser = await User.findById(req.user['_id'])

      if (user) {
        let cart: ICart = req['cart']
        const product: IProduct = await Product.findById(productId)

        if (cart) {
          const itemIndex = cart.products.findIndex(el => el.product._id.toString() === productId)

          if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity as number;
            cart.products[itemIndex].price += (product.price * (quantity as number));
          } else {
            cart.products.push({
              product,
              quantity: quantity as number,
              price: product.price * (quantity as number)
            })
          }

          cart = await cart.save() 
        } else {
          const products: productElement[] = [
            {
              product,
              quantity: quantity as number,
              price: product.price * (quantity as number)
            }
          ]
          cart = await Cart.create({
            user,
            products,
          })
        }

        return res.json({ cart })
      }

      return res.status(404).json({ message: 'User requesting action does not exsist.'})

    } catch (err) {
      console.log(err)
      return next(err)
    }
  }

  public async removeProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const productId = req.params.productId;
      const quantityToRemove = req.query.quantity || 1;
      const user: IUser = await User.findById(req.user['_id'])

      if (user) {
        let cart: ICart = req['cart']
        const product: IProduct = await Product.findById(productId)
        const itemIndex = cart.products.findIndex(el => el.product._id.toString() === productId)

        if (itemIndex > -1) {
          const availableQuantity: number = cart.products[itemIndex].quantity
          const resultQuantity: number = availableQuantity - (quantityToRemove as number)

          if (resultQuantity > 0) {
            cart.products[itemIndex].quantity = resultQuantity
            cart.products[itemIndex].price = (product.price * resultQuantity)
          } else {
            cart.products = cart.products.filter((item, index) => index !== itemIndex)
          }

          cart = await cart.save()

          return res.json({ cart })
        }
      }

      return res.status(404).json({ message: 'User requesting action does not exsist.'})

    } catch (err) {
      console.log(err)
      return next(err)
    }
  }

  public async getCartProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const cartId = req.params.cartId;
      const cart = await Cart.findById(cartId).populate('products.product');

      if (!cart) return res.status(404).json({ message: "Requested cart does not exist" });

      const query = {};
      let index: number = 0;

      const count: number  = cart.products.length;

      let last = req.query.last
      console.log(last)
      const limit = req.query.limit ? req.query.limit : 10;

      if (last) index = cart.products.findIndex(el => el['_id'].toString() === last.toString())
      console.log(index)
      if (limit > 1 ) (limit as number) -= 1
      if (index > 0 ) index += 1

      const products = cart.products.slice(index, limit as number)

      const offset = last ? products.length : count;
      const isLast = offset <= limit;

      return res.json({ products, isLast })
    } catch (err) {
      return next(err)
    }
  }

  public async getCartSummary(req: Request, res: Response, next: NextFunction): Promise<any> {
    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId);

    if (cart) {
      if (cart.products && cart.products.length > 0) {
        const summary = cart.products.reduce((prev, current): any => {
          return {
            overallPrice: prev.overallPrice + current.price,
            overallQuantity: prev.overallQuantity + current.quantity
          }
        }, {
          overallPrice: 0,
          overallQuantity: 0,
        })

        return res.json({ summary })
      }
    }
  }
}