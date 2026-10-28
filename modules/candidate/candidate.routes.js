const Joi = require('joi');
const CandidateController = require('./candidate.controller.js');
const CandidateValidation = require('./candidate.validation.js');

module.exports = [
    {
        method: 'GET',
        path: '/candidates',
        options: {
            description: 'Find all the Candidates',
            tags: ['api', 'Candidates'],
            notes: 'Returns all the Candidates'
        },
        handler: CandidateController.find
    },
    {
        method: 'POST',
        path: '/candidates',
        options: {
            validate: {
                payload: CandidateValidation.candidateSchema,
                failAction: (_request, h, err) => {
                    return h.response({ error: err.details[0].message }).code(400).takeover();
                }
            },
            description: 'Create new candidate',
            tags: ['api', 'Candidates'],
            notes: 'Return newly created candidate'
        },
        handler: CandidateController.create
    }
];
