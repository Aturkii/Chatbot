import { Router } from "express";
import * as prodcutController from "./product.controller.js";

const router = Router()

//^ Get all products
router.get('/',
  prodcutController.getAllProducts)

//^ Add Product
router.post('/',
  prodcutController.createProduct)

//^ Update Product
router.put('/',
  prodcutController.updateProduct)

//^ Delete Product
router.delete('/',
  prodcutController.deleteProduct)

export default router;
