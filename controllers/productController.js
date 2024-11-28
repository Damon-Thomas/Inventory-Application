const asyncHandler = require("express-async-handler");
const query = require("../model/query.js");
const { validationResult } = require("express-validator");
const { render } = require("ejs");




const getProducts = asyncHandler(async (req, res) => {
    if(Object.keys(req.query).length != 0) {
        
    let products = await query.getToolsByBrand(req.query.brand)
    res.render('productPage', {title: "Toolbox", products: products})}
    else {
        
    let products = await query.getAllTools()
    res.render('productPage', {title: "Toolbox", products: products})
    }
    
})

const getNewProductForm = asyncHandler(async (req, res) => {
    res.render('productForm', {title: "New Product",
        formType: 'newForm',
        baseStyle: "../css/styles.css",
        formStyle: "../css/formstyles.css",
        errors: null
        })
    
})

const submitNewProduct = asyncHandler(async (req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()) {
    let productUrl = req.body.productIMG != '' ? req.bodt.productIMG : 'https://cdn.pixabay.com/photo/2016/03/31/18/24/screwdriver-1294338_960_720.png'
    query.insertProduct(req.body.productName, req.body.productBrand, req.body.battery, req.body.productPrice, productUrl)
    res.redirect('/')
    }
    else{
    res.render('productForm', {title: "New Product",
        formType: 'newForm',
        baseStyle: "../css/styles.css",
        formStyle: "../css/formstyles.css",
        errors: result.array(),
        })
}
    
})

const getUpdateProductForm = asyncHandler(async (req, res) => {
    
    const product = await query.getProductById(req.params.id)
    let checked
    if (product.battery) checked = "checked"
    else checked = ''
    res.render('productForm', {title: "Edit Product",
        formType: 'updateForm',
        baseStyle: "../../css/styles.css",
        formStyle: "../../css/formstyles.css",
        id:product.id,
        name: product.name,
        brand: product.brand,
        battery:checked,
        price: product.price,
        image: product.image,
        errors: null
    })
    
});

const submitUpdateProduct = asyncHandler(async (req, res) => {
    const product = await query.getProductById(req.params.id)
    const result = validationResult(req)
    let battery = false
    if( req.body.battery) {
        battery = true
    }
    if(result.isEmpty()) {
    
    let productUrl = req.body.productIMG != '' ? req.body.productIMG : 'https://cdn.pixabay.com/photo/2016/03/31/18/24/screwdriver-1294338_960_720.png'
    query.updateProduct(req.params.id, req.body.productName, req.body.productBrand, battery, req.body.productPrice, productUrl)
    res.redirect('/products')
    }
    else{
    res.render('productForm', {title: "Edit Product",
        formType: 'updateForm',
        baseStyle: "../../css/styles.css",
        formStyle: "../../css/formstyles.css",
        id:product.id,
        name: product.name,
        brand: product.brand,
        battery:battery,
        price: product.price,
        image: product.image,
        errors: result.array()
    })}  
})

const deleteBrand = asyncHandler(async (req, res) => {
    console.log(req.query)
    res.render('delete', 
        {selection: "brand",
         acter: `/products/delete/brand?brand=${req.query.brand}`,
         pass: ''
        }
    )
})

const brandDeleteVerifier = asyncHandler(async (req, res) => {
    console.log(req.query)
    if(req.body.deletePass == process.env.ADMINPASSWORD) {
        query.deleteBrand(req.query.brand)
        res.redirect('/')
    }
    else {
        res.render('delete',
            {selection: 'brand', 
                acter: `/products/delete/brand?brand=${req.query.brand}`,
                pass: 'Invalid Password'
            }
        )
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    console.log('dp', req.query)
    res.render('delete', 
        {selection: "product",
         acter: `/products/delete/product?product=${req.query.product}`,
         pass: ''
        }
    )
})

const productDeleteVerifier = asyncHandler(async (req, res) => {
    console.log('verify', req.query)
    if(req.body.deletePass == process.env.ADMINPASSWORD) {
        query.deleteProductById(req.query.product)
        res.redirect('/products')
    }
    else {
        res.render('delete',
            {selection: 'product', 
                acter: `/products/delete/product?product=${req.query.product}`,
                pass: 'Invalid Password'
            }
        )
    }
})



module.exports ={
    getProducts,
    getNewProductForm,
    submitNewProduct,
    getUpdateProductForm,
    submitUpdateProduct, 
    deleteBrand,
    brandDeleteVerifier,
    deleteProduct,
    productDeleteVerifier
    
}