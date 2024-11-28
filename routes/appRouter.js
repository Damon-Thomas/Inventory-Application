const { Router } = require("express");
const bodyParser = require('body-parser');
const appRouter = Router();
const homeController = require("../controllers/homeController.js")
const productController = require("../controllers/productController.js")
const { validator, editValidator } = require("../controllers/validators/validateProduct.js");

appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.post("/products/new", validator, productController.submitNewProduct)
appRouter.get("/products/new", productController.getNewProductForm)
appRouter.post("/products/delete/brand", productController.brandDeleteVerifier)
appRouter.get("/products/delete/brand", productController.deleteBrand)
appRouter.post("/products/delete/product", productController.productDeleteVerifier)
appRouter.get("/products/delete/product", productController.deleteProduct)
appRouter.post("/products/update/:id", validator, editValidator, productController.submitUpdateProduct)
appRouter.get("/products/update/:id", productController.getUpdateProductForm)
appRouter.get("/products", productController.getProducts)
appRouter.get("/", homeController.getHome)

module.exports = appRouter