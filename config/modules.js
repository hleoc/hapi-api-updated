'use strict';

const CompanyModule = require('../modules/company/company.module');
const ApplicationModule = require('../modules/application/application.module');
const CandidateModule = require('../modules/candidate/candidate.module');
const JobModule = require('../modules/job/job.module');
const UserModule = require('../modules/user/user.module');

module.exports = [
    CompanyModule,
    ApplicationModule,
    CandidateModule,
    JobModule,
    UserModule
];
