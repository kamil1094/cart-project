import { Router } from "express";
import { CartController } from '../controllers/cart';
import { CartMiddleware } from '../middleware/cart';
import { AuthorizationMiddleware } from '../middleware/authorization';

export class CartRoutes {
  public router: Router;
  public cartController: CartController = new CartController();
  public cartMiddleware: CartMiddleware = new CartMiddleware();
  public authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.put("/:productId",
      this.authorizationMiddleware.authorize,
      this.authorizationMiddleware.authorizeBasketOwner,
      this.cartMiddleware.addOrRemoveProductValidation(),
      this.cartController.addProduct
    );
    this.router.delete("/:productId",
      this.authorizationMiddleware.authorize,
      this.authorizationMiddleware.authorizeBasketOwner,
      this.cartMiddleware.addOrRemoveProductValidation(),
      this.cartController.removeProduct
    );
    this.router.get("/:cartId/products",
      this.authorizationMiddleware.authorize,
      this.cartMiddleware.getCartProductsValidation(),
      this.cartController.getCartProducts
    );
    this.router.get("/:cartId/summary",
      this.authorizationMiddleware.authorize,
      this.cartMiddleware.getCartSummaryValidation(),
      this.cartController.getCartSummary
    );
  }
}