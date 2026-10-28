const Candidate = require('./candidate.model');
const Company = require('../company/company.model');

module.exports = {
    async find(_request, h) {
        try {
            const findAllCandidates = await Candidate.find({}).populate('company');

            if (findAllCandidates.length === 0) {
                return h.response([]).code(200);
            }

            return h.response(findAllCandidates).code(200);
        } catch (err) {
            return h.response({ error: 'Internal Server error' }).code(500);
        }
    },
    async create(request, h) {
        try {
            const savedCandidate = await Candidate.create({
                first_name: request.payload.first_name,
                last_name: request.payload.last_name,
                email: request.payload.email,
                company: request.payload.company
            });

            const companyId = request.payload.company;
            const company = await Company.findById(companyId);

            if(!company) {
                return h.response({ error: 'Company not found' }).code(404);
            }

            company.candidates.push(savedCandidate);
            await company.save();

            return h.response(savedCandidate).code(201);
        } catch (err) {
            return h.response({ error: 'Internal server error' }).code(500);
        }
    }
};
