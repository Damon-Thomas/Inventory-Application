const asyncHandler = require("express-async-handler");
const query = require("../model/query.js")

const getProducts = asyncHandler(async (req, res) => {
    let products = await query.getAllTools()
    res.render('productPage', {title: "Toolbox", products: products})
    res.end()
})

const getNewProductForm = asyncHandler(async (req, res) => {
    res.render('productForm', {title: "New Product",
        formType: 'newForm',
        baseStyle: "../css/styles.css",
        formStyle: "../css/formstyles.css"
        })
    res.end()
})

const submitNewProduct = asyncHandler(async (req, res) => {
    console.log('req.body', req.body)
    let productUrl = req.body.productIMG != '' ? req.bodt.productIMG : 'https://cdn.pixabay.com/photo/2016/03/31/18/24/screwdriver-1294338_960_720.png'
    query.insertProduct(req.body.productName, req.body.productBrand, req.body.battery, req.body.productPrice, productUrl)
    res.redirect('/')
})

const getUpdateProductForm = asyncHandler(async (req, res) => {
    
    const product = await query.getProductById(req.params.id)
    let checked
    if (product.battery) checked = "checked"
    else checked = ''

    console.log('product', product.name)
    res.render('productForm', {title: "Edit Product",
        formType: 'updateForm',
        baseStyle: "../../css/styles.css",
        formStyle: "../../css/formstyles.css",
        id:product.id,
        name: product.name,
        brand: product.brand,
        battery:checked,
        price: product.price,
        image: product.image
    })
    
});

const submitUpdateProduct = asyncHandler(async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.params', req.params)
    let battery = false
    if( req.body.battery) {
        battery = true
    }

    query.updateProduct(req.params.id, req.body.productName, req.body.productBrand, battery, req.body.productPrice, req.body.productIMG)
    res.redirect('/products')
})


module.exports ={
    getProducts,
    getNewProductForm,
    submitNewProduct,
    getUpdateProductForm,
    submitUpdateProduct
    
}