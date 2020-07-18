import { NextFunction, Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import passport from "passport"

import { User } from "../models/user";
import { Token } from "../models/token";

import config from "../config"
import "../strategies/local";

export class UserController {
  public async registerUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
  
      await User.create(userData);

      const token = jwt.sign({ email: userData.email }, config.JWT_SECRET)
  
      return res.status(200).json({ token });
    } catch (err) {
      return next(err)
    }
  }

  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      passport.authenticate("local", async function (err, user, info) {
        if (err) return next(err);
  
        if (!user) return res.status(401).json({ message: "unauthorized" }); // change to use info.message maybe

        return res.status(200).json({ token: jwt.sign({ email: user.email }, config.JWT_SECRET) });
      })(req, res, next)
    } catch (err) {
      return next(err)
    }
  }

  public async logoutUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const jwtToken = req.headers.authorization.split(' ')[1]
      const token = await Token.findOne({ value: jwtToken })

      if (token) {
        await Token.updateOne({ value: jwtToken }, { valid: false} )
      } else {
        await Token.create({
          value: jwtToken,
          valid: false,
        })
      }
      

      return res.status(200).json({ message: 'Token invalidated' })
    } catch (err) {
      return next(err)
    }
  }
}