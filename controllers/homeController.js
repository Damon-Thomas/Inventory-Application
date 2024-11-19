const asyncHandler = require("express-async-handler");
const query = require("../model/query.js")

const getHome = asyncHandler(async (req, res) => {
    let brands = await query.getDistinctBrands()
    res.render('index', {title: "Homepage", brands: brands})
    res.end()
})

module.exports ={
    getHome
}