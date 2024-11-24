const asyncHandler = require("express-async-handler");
const query = require("../model/query.js")

const getHome = asyncHandler(async (req, res) => {
    let brand = await query.getDistinctBrands()
    res.render('index', {title: "Home", brands: brand})
    res.end()
})

module.exports ={
    getHome
}