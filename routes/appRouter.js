const { Router } = require("express");
const bodyParser = require('body-parser');
const appRouter = Router();
const homeController = require("../controllers/homeController.js")
const productController = require("../controllers/productController.js")

appRouter.get("/", homeController)
appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.get("/products", productController)


module.exports = messageRouter