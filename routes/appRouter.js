const { Router } = require("express");
const bodyParser = require('body-parser');
const appRouter = Router();
const homeController = require("../controllers/homeController.js")
const productController = require("../controllers/productController.js")

appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.post("/products/new", productController.submitNewProduct)
appRouter.get("/products/new", productController.getNewProductForm)
appRouter.post("/products/update/:id", productController.submitNewProduct)
appRouter.get("/products/update/:id", productController.getUpdateProductForm)
appRouter.get("/products", productController.getProducts)
appRouter.get("/", homeController.getHome)




module.exports = appRouter