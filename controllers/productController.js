const asyncHandler = require("express-async-handler");
const query = require("../model/query.js")

const getProducts = asyncHandler(async (req, res) => {
    let products = await query.getAllTools()
    res.render('productPage', {title: "Products", products: products})
    res.end()
})

const getNewProductForm = asyncHandler(async (req, res) => {
    res.render('productForm', {title: "New Product", formType: 'newForm'})
    res.end()
})

const submitNewProduct = asyncHandler(async (req, res) => {
    console.log('req.body', req.body)
    let productUrl = req.body.productIMG != '' ? req.bodt.productIMG : 'https://cdn.pixabay.com/photo/2016/03/31/18/24/screwdriver-1294338_960_720.png'
    query.insertProduct(req.body.productName, req.body.productBrand, req.body.battery, req.body.productPrice, productUrl)
    res.redirect('/')
})

const getUpdateProductForm = asyncHandler(async (req, res) => {
    console.log(req.params)
});

const submitUpdateProduct = asyncHandler(async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.params', req.params)

    query.updateProduct(req.params, req.body.productName, req.body.productBrand, req.body.battery, req.body.productPrice, req.body.productIMG)
    res.redirect('/')
})


module.exports ={
    getProducts,
    getNewProductForm,
    submitNewProduct,
    getUpdateProductForm,
    submitUpdateProduct
    
}