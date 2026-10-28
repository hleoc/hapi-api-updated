const Application = require('./application.model');
const Candidate = require('../candidate/candidate.model');
const Job = require('../job/job.model');

module.exports = {
    async find(_request, h) {
        try {
            const findAllApplicaton = await Application.find({})
            .populate('candidate')
            .populate('job');

            if (findAllApplicaton.length === 0) {
                return h.response([]).code(200);
            }
            return h.response(findAllApplicaton).code(200);
        } catch (err) {
            return h.response({ error: 'Internal server error'}).code(500);
        }
    },
    async create(request, h) {
        try {
            const { hired, candidate: candidateId, job: jobId} = request.payload;
            
            const candidate = await Candidate.findById(candidateId);

            if (!candidate) {
                return h.response({ error: 'Candidate not found!'}).code(404);
            }

            const job = await Job.findById(jobId);

            if (!job) {
                return h.response({ error: 'Job not found!'}).code(404);
            }

            const newApplication = await Application.create({
                hired,
                candidate: candidateId,
                job: jobId
            });

            candidate.applications.push(newApplication._id);
            await candidate.save();

            job.applications.push(newApplication._id);
            await job.save();

            return h.response(newApplication).code(201);
        } catch (err) {
            console.error(err);
            return h.response({ error: 'Internal server error' }).code(500);
        }
    }
};