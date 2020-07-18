import { Router } from "express";
import { UserController } from '../controllers/user'
import { AuthorizationMiddleware } from '../middleware/authorization'
import { UserMiddleware } from '../middleware/user'

export class UserRoutes {
  public router: Router;
  public userController: UserController = new UserController();
  public authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();
  public userMiddleware: UserMiddleware = new UserMiddleware();

  constructor() {
    this.router = Router();
    this.routes();
  }



  routes() {
    this.router.post("/register", this.userController.registerUser);
    this.router.post("/login", this.userMiddleware.loginValidation(), this.userController.loginUser);
    this.router.post("/logout", this.authorizationMiddleware.authorize, this.userController.logoutUser);
  }
}