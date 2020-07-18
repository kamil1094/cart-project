import { Router } from "express";
import { ProductController } from '../controllers/product';
import { ProductMiddleware } from '../middleware/product';
import { AuthorizationMiddleware } from '../middleware/authorization';

export class ProductRoutes {
  public router: Router;
  public productController: ProductController = new ProductController();
  public productMiddleware: ProductMiddleware = new ProductMiddleware();
  public authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", this.authorizationMiddleware.authorize, this.productMiddleware.imageValidation, this.productMiddleware.createProductValidation(), this.productController.createProduct);
    this.router.get("/:id", this.authorizationMiddleware.authorize, this.productMiddleware.removeOrGetProductValidation(), this.productController.getProduct);
    this.router.get("/", this.authorizationMiddleware.authorize, this.productMiddleware.getProductsValidation(), this.productController.getProducts);
    this.router.put("/:id", this.authorizationMiddleware.authorize, this.productMiddleware.imageValidation, this.productMiddleware.updateProductValidation(), this.productController.updateProduct);
    this.router.delete("/:id", this.authorizationMiddleware.authorize, this.productMiddleware.removeOrGetProductValidation() ,this.productController.removeProduct);
  }
}