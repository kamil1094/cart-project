import { NextFunction, Request, Response, response } from "express";
import { ObjectID } from "mongodb"

import { Product, IProduct } from "../models/product";

export class ProductController {
  public async createProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
      })

      return res.status(200).json({ product })
    } catch (err) {
      return next(err)
    }
  }

  public async getProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const productId: string = req.params.id
      const product: IProduct = await Product.findById(productId)

      return res.json({ product })
    } catch (err) {
      return next(err)
    }
  }

  public async getProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const query = {};

      let last: string;
      const limit = req.query.limit ? req.query.limit : 10;

      if (req.query && req.query.last) last = (req.query as any).last;

      if (req.query.minPrice) {
        query['price'] = {
          $gt: req.query.minPrice
        }
      }

      if (req.query.maxPrice) {
        query['price'] = {
          $lt: req.query.maxPrice
        }
      }

      const count: number  = await Product.count(query);
      
      if (last) query['_id'] = { $gt: new ObjectID(last) }

      const offset = last ? await Product.count(query) : count;
      const isLast = offset <= limit;

      const products: IProduct[] = await Product.find(query).limit(limit as number);

      return res.json({ products, isLast })
    } catch (err) {
      return next(err)
    }
  }

  public async updateProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const productId: string = req.params.id
      const update = {
        ...req.body,
      }
      const product: IProduct = await Product.findByIdAndUpdate(productId, { ...update }, { new: true })

      return res.json({ product })
    } catch (err) {
      return next(err)
    }
  }

  public async removeProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const productId: string = req.params.id
      await Product.findByIdAndDelete(productId)

      return res.json({ success: true, message: 'Product removed.' })
    } catch (err) {
      return next(err)
    }
  }
}