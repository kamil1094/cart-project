import { NextFunction, Request, Response } from "express";

import { Product } from "../models/product";

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
}