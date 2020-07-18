import { Router } from "express";
import { ProductController } from '../controllers/product'
import { ProductMiddleware } from '../middleware/product'

export class ProductRoutes {
  public router: Router;
  public productController: ProductController = new ProductController();
  public productMiddleware: ProductMiddleware = new ProductMiddleware();

  constructor() {
    this.router = Router();
    this.routes();
  }



  routes() {
    this.router.post("/", this.productMiddleware.imageValidation, this.productMiddleware.productValidation(), this.productController.createProduct);
  }
}