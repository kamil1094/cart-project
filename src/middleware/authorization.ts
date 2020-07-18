import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { Token } from '../models/token'
import { Cart } from '../models/cart'

import "../strategies/jwt"

export class AuthorizationMiddleware {
  public authorize(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, jwtPayload) {
      if (!req.headers.authorization) return res.status(401).json({ message: "unauthorized" });
      const jwtToken = req.headers.authorization.split(' ')[1]
      if (err) return res.status(401).json({ message: "unauthorized" });

      if (!user) return res.status(401).json({ message: "unauthorized" });

      Token.findOne({ value: jwtToken })
      .then(doc => {
        if (doc === null || doc.valid) {
          req.user = user;
          return next();
        }
        return res.status(401).json({ message: "unauthorized" });
      })
      .catch(err => next(err))
    })(req, res, next);
  }

  public async authorizeBasketOwner(req: Request, res: Response, next: NextFunction) {
    const cart = await await Cart.findOne({ user: req.user['_id'] }).populate('products.product');

    if (!cart) return res.status(401).json({ message: "Only owner can remove items from cart." });

    req['cart'] = cart

    return next();
  }
}