import { NextFunction, Request, Response } from "express";
import { Joi, celebrate } from "celebrate"


export class ProductMiddleware {
  public imageValidation(req: Request, res: Response, next: NextFunction) {
    if (!req.body.image) return next();
    const image = req.body.image;
    const buffer = Buffer.from(image.split(';base64,').pop(), 'base64');

    const extension = image.substring("data:image/".length, image.indexOf(";base64"));
    if (!['jpeg', 'png', 'jpg'].includes(extension)) return res.status(400).json({ message: 'Wrong image type. Allowed types: jpeg, png, jpg.'})
    
    const imageSizeInMB = buffer.length / 1e+6
    if (imageSizeInMB > 2) return res.status(400).json({ message: 'Image exceeded maximum size of 2MB'})

    // extract raw base64 string
    req.body.image = image.split(';base64,').pop()

    return next();
  }

  public createProductValidation() {
    return celebrate({
      body: Joi.object().keys({
        price: Joi.number().greater(0),
        name: Joi.string(),
        image: Joi.string(),
      })
    })
  }

  public updateProductValidation() {
    return celebrate({
      body: Joi.object().keys({
        price: Joi.number().greater(0).optional(),
        name: Joi.string().optional(),
        image: Joi.string().optional(),
      }),
      params: Joi.object().keys({
        id: Joi.string().length(24)
      })
    })
  }

  public removeOrGetProductValidation() {
    return celebrate({
      params: Joi.object().keys({
        id: Joi.string().length(24)
      })
    })
  }


  public getProductsValidation() {
    return celebrate({
      query: Joi.object().keys({
        limit: Joi.number().optional(),
        last: Joi.string().length(24).optional(),
        maxPrice: Joi.number().optional(),
        minPrice: Joi.number().optional(),
      })
    })
  }
}