const Joi = require('joi');
const CompanyValidation = require('../company/company.validation');

const applicationSchema = Joi.object({
    hired: Joi.boolean().optional(),
    candidate: CompanyValidation.companyIdSchema,
    job: CompanyValidation.companyIdSchema
});

const headersAuthorization = Joi.object({
    authorization: Joi.string().required() 
});

module.exports = {
    applicationSchema,
    headersAuthorization
};
