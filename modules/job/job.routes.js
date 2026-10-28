const Joi = require('joi');
const JobController = require('./job.controller');
const JobValidation = require('./job.validation');

module.exports = [
    {
        method: 'GET',
        path: '/jobs',
        options: {
            description: 'Find all the Jobs',
            tags: ['api', 'jobs'],
            notes: 'Returns all the Jobs'
        },
        handler: JobController.find
    },
    {
        method: 'POST',
        path: '/jobs',
        options: {
            validate: {
                payload: JobValidation.jobSchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Create new Job',
            tags: ['api', 'jobs'],
            notes: 'Returns newly created Job'
        },
        handler: JobController.create
    }
];
