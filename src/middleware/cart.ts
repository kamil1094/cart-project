import { Joi, celebrate } from "celebrate"

export class CartMiddleware {
  public addOrRemoveProductValidation() {
    return celebrate({
      params: Joi.object().keys({
        productId: Joi.string().length(24)
      }),
      query: Joi.object().keys({
        quantity: Joi.number().min(1).default(1)
      })
    })
  }

  public getCartProductsValidation() {
    return celebrate({
      params: Joi.object().keys({
        cartId: Joi.string().length(24)
      }),
      query: Joi.object().keys({
        quantity: Joi.number().min(1).default(1),
        last: Joi.string().optional(),
        limit: Joi.number().optional()
      })
    })
  }

  public getCartSummaryValidation() {
    return celebrate({
      params: Joi.object().keys({
        cartId: Joi.string().length(24)
      }),
    })
  }
}