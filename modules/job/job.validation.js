const Joi = require('joi');
const CompanyValidation = require('../company/company.validation');

const jobSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    company: CompanyValidation.companyIdSchema
});

module.exports = {
    jobSchema,
};
