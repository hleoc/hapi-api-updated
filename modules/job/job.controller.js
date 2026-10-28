const Job = require('./job.model');
const Company = require('../company/company.model');

module.exports = {
    async find(_request, h) {
        try {
            const findAllJobs = await Job.find({}).populate('company');

            if (findAllJobs.length === 0) {
                return h.response([]).code(200);
            }

            return h.response(findAllJobs).code(200);
        } catch (err) {
            return h.response({ error: 'Internal server error' }).code(500);
        }
    },
    async create(request, h) {
        try {
            const savedJob = await Job.create({
                title: request.payload.title,
                company: request.payload.company
            });

           const companyId = request.payload.company;
           const company = await Company.findById(companyId);
           
           if (!company) {
                return h.response('Company not found!').code(404);
           }

           company.jobs.push(savedJob);
           await company.save();

           return h.response(savedJob).code(201);
        } catch (err) {
            return h.response({ error: 'Internal server error' }).code(500);
        }
    }
};
