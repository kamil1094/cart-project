import { NextFunction, Request, Response } from "express";
import { Joi, celebrate } from "celebrate"


export class ProductMiddleware {
  public imageValidation(req: Request, res: Response, next: NextFunction) {
    const image = req.body.image;
    const buffer = Buffer.from(image.split(';base64,').pop(), 'base64');

    const extension = image.substring("data:image/".length, image.indexOf(";base64"));
    console.log("MB: " + buffer.length / 1e+6)


    // extract raw base64 string
    req.body.image = image.split(';base64,').pop()

    return next();
  }

  public productValidation() {
    return celebrate({
      body: Joi.object().keys({
        price: Joi.number().greater(0),
        name: Joi.string(),
        image: Joi.string(),
      })
    })
  }
}