const { body } = require("express-validator");

const validator = 
[
    body('productName').trim()
        .notEmpty().withMessage('Name required length 1-100')
        .bail()
        .isLength({min: 1, max: 100}).withMessage('Name required length 1-100')
        .bail()
        .isAlphanumeric().withMessage('Name must be Alphanumeric'),
    body('productBrand').trim()
        .optional()
        .isLength({max: 20}).withMessage('Brand must be < 20 characters'),
    body('productPrice').trim()
        .isCurrency({allow_negatives: false, require_decimal: true, digits_after_decimal: [1,2]  }).withMessage('Price = currency. Ex: 24.37')
        .bail()
        .isFloat({min: 1, max: 9999}).withMessage("Price must be between 1 and 9999."),
    body('productIMG').trim()
        .optional({values: 'falsy'})
        .isURL().withMessage('Must be valid URL'),
    
    
]

const editValidator = [
    body('.password').trim()
        .custom(value => {
            return value == process.env.ADMINPASSWORD
        }).withMessage('Incorrect Password')
]

module.exports ={
    validator,
    editValidator
}