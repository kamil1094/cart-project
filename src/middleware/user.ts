import { Joi, celebrate } from "celebrate"

export class UserMiddleware {
  public loginValidation() {
    return celebrate({
      body: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().min(6)
      })
    })
  }
}