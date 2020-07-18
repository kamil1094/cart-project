import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { Token } from '../models/token'

import "../strategies/jwt"

export class AuthorizationMiddleware {
  public authorize(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, jwtPayload) {
      const jwtToken = req.headers.authorization.split(' ')[1]
      if (err) return res.status(401).json({ message: "unauthorized" });

      if (!user) return res.status(401).json({ message: "unauthorized" });

      Token.findOne({ value: jwtToken })
      .then(doc => {
        if (doc === null) return next()
        if (doc.valid || doc === null) return next()
        return res.status(401).json({ message: "unauthorized" });
      })
      .catch(err => next(err))
    })(req, res, next);
  }

  public authorizeBasketOwner(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, jwtToken) {
      if (err) return res.status(401).json({ message: "unauthorized" });

      if (!user) return res.status(401).json({ message: "unauthorized" });

      return next() // return next() only if user is an owner of basket id send in req.params.id
    })(req, res, next);
  }
}