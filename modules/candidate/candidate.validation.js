const Joi = require('joi');
const CompanyValidation = require('../company/company.validation');

const candidateSchema = Joi.object({
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required(),
    company: CompanyValidation.companyIdSchema,
});

module.exports = {
    candidateSchema
};
