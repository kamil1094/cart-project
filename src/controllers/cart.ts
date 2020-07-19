import { NextFunction, Request, Response } from "express";

import { User, IUser } from "../models/user";
import { Cart, ICart, productElement } from "../models/cart";
import { Product, IProduct } from "../models/product";

export class CartController {
  public async createOrUpdateCart(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const productId = req.params.productId;
      const quantity = req.query.quantity || 1;
      const user: IUser = await User.findById(req.user['_id'])
      
      if (user) {
        let cart: ICart = await Cart.findOne({ user }).populate('products.product')
        const product: IProduct = await Product.findById(productId)
        if (!product) return res.status(404).json({ message: 'Given product does not exsist.'})
        if (cart) {
          cart = await CartController.updateCartProducts(cart, product, quantity as number)
        } else {
          cart = await CartController.createCart(user, product, quantity as number)
        }

        return res.json({ cart })
      }

      return res.status(404).json({ message: 'User requesting action does not exsist.'})

    } catch (err) {
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
          cart = await CartController.removeProductFromCart(cart, product, itemIndex, quantityToRemove as number)
          return res.json({ cart })
        }

        return res.status(404).json({ message: 'Item does not exist.'})
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

      let index: number = 0;

      const count: number  = cart.products.length;

      let last = req.query.last

      let limit = req.query.limit ? req.query.limit : 10;

      if (last) index = cart.products.findIndex(el => el['_id'].toString() === last.toString())

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

  static async createCart (user: IUser, product: IProduct, quantity: number):Promise<ICart> {
    const products: productElement[] = [
      {
        product,
        quantity: quantity,
        price: product.price * quantity
      }
    ]

    return Cart.create({
      user,
      products,
    })
  }

  static async updateCartProducts (cart: ICart, product: IProduct, quantity: number):Promise<ICart> {
    const itemIndex = cart.products.findIndex(el => el.product._id.toString() === product._id.toString())
    const newCartProducts = [
      ...cart.products
    ]

    if (itemIndex > -1) {
      newCartProducts[itemIndex].quantity += quantity as number;
      newCartProducts[itemIndex].price += (product.price * (quantity as number));
    } else {
      newCartProducts.push({
        product,
        quantity: quantity as number,
        price: product.price * (quantity as number)
      })
    }

    cart.products = [
      ...newCartProducts,
    ]

    return cart.save()
  }

  static async removeProductFromCart(cart: ICart, product: IProduct, itemIndex: number, quantityToRemove: number):Promise<ICart> {
    const availableQuantity: number = cart.products[itemIndex].quantity
    const resultQuantity: number = availableQuantity - quantityToRemove

    let newCartProducts: productElement[] = [
      ...cart.products,
    ]

    if (resultQuantity > 0) {
      newCartProducts[itemIndex].quantity = resultQuantity
      newCartProducts[itemIndex].price = (product.price * resultQuantity)
    } else {
      newCartProducts = newCartProducts.filter((item, index) => index !== itemIndex)
    }

    cart.products = [
      ...newCartProducts,
    ]

    return cart.save()
  }
}