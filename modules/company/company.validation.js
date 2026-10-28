const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    city: Joi.string().min(3).optional(),
    address: Joi.string().min(3).optional()
});

const companyIdSchema = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }

    return value;
}, 'ObjectId Validation').messages({
    'any.invalid': 'Invalid ID'
});

const companyUpdateSchema = Joi.object({
    name: Joi.string(),
    city: Joi.string(),
    address: Joi.string()
}).min(1).messages({
    'object.min': 'No fields to update'
});

module.exports = { 
    companySchema,
    companyIdSchema,
    companyUpdateSchema
};
