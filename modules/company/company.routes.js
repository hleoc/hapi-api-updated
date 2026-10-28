const Joi = require('joi');
const CompanyController = require('./company.controller');
const CompanyValidation = require('./company.validation');

module.exports = [
    {
        method: 'POST',
        path: '/companies',
        options: {
            validate: {
                payload: CompanyValidation.companySchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Create new Company',
            tags: ['api', 'companies'],
            notes: 'Returns newly created company'
        },
        handler: CompanyController.create
    },
    {
        method: 'GET',
        path: '/companies',
        options: {
            description: 'Find all the Companies',
            tags: ['api', 'companies'],
            notes: 'Returns all the Companies'
        },
        handler: CompanyController.find
    },
    {
        method: 'GET',
        path: '/companies/{id}',
        options: {
            validate: {
                params: Joi.object().keys({
                    id: CompanyValidation.companyIdSchema.required()
                }),
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Find Company By Id',
            tags: ['api', 'companies'],
            notes: 'Returns a single Company'
        },
        handler: CompanyController.findOne
    },
    {
        method: 'PUT',
        path: '/companies/{id}',
        options: {
            validate: {
                params: Joi.object().keys({
                    id: CompanyValidation.companyIdSchema.required()
                }),
                payload: CompanyValidation.companyUpdateSchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Update Company By Id',
            tags: ['api', 'companies'],
            notes: 'Returns a updated Company'
        },
        handler: CompanyController.update
    },
    {
        method: 'DELETE',
        path: '/companies/{id}',
        options: {
            validate: {
                params: Joi.object().keys({
                    id: CompanyValidation.companyIdSchema.required()
                }),
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Delete the Company By Id',
            tags: ['api', 'companies'],
            notes: 'Returns a deleted message'
        },
        handler: CompanyController.delete
    }
];