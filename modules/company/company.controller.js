const Boom = require('boom');
const Company = require('./company.model');
const User = require('../user/user.model');

module.exports = {
    async create(request, h) { 
        try {
            const userExists = await User.exists({
                //fazendo desta forma nao tem como pesquisar 
                // pelo id de outro usuário
                _id: request.auth.credentials.id
            });

            if (!userExists) {
                throw Boom.notFound('User not found!')
            };

            const savedCompany = await Company.create({
                name: request.payload.name,
                city: request.payload.city,
                address: request.payload.address,
                users: request.auth.credentials.id
            }); 
                            
            return h.response(savedCompany).code(201);
        } catch (err) {
            //A IA aconselhou usar o Boom para os erros 
            // return h.response({ error: 'Internal server error' }).code(500);
            throw Boom.badImplementation('Could not create company', err);
        }
    },
    async find(_request, h) {
        try {
            const findAllCompanies = await Company.find({})
            .populate('candidates')
            .populate('jobs');

            if (findAllCompanies.length === 0) {
                return h.response([]).code(200);
            }

            return h.response(findAllCompanies).code(200);
        } catch (err) {
            return h.response({ error: 'Internal server error' }).code(500);
        }
    },
    async findOne(request, h) {
        const { id } = request.params;
        
        try {
            const findCompanies = await Company.findById(id);
        
            if (!findCompanies) {
                return h.response({ message: 'Company not found!'}).code(404);
            }
        
            return h.response(findCompanies).code(200);
        
        } catch (err) {
            return h.response({ error: 'Erro interno do servidor' }).code(500);
        }
    },
    async update(request, h) {
        const { id } = request.params;
        
        try {
            const company = await Company.findByIdAndUpdate(id, request.payload,  { returnDocument: 'after' });
            if (!company) {
                return h.response({ error: 'Company not found' }).code(404);
            }
        
            return h.response(company).code(200);
            } catch (err) {
                return h.response({ error: 'Internal server error' }).code(500);
            }
    },
    async delete(request, h) {
        const { id } = request.params;

        try {
            const deleteCompany = await Company.findByIdAndDelete(id);

            if (!deleteCompany) {
                return h.response({ error: 'Company not found'}).code(404);
            }

            return h.response({ message: `Company has been deleted with id - ${id}` }).code(200);
        } catch (err) {
            return h.response({ error: 'Internal server error' }).code(500);
        }
    }
};

// EXMPLO Exporta todas as funções no final
// const mongoose = require('mongoose');
// const Company = require('../models');

// async function create(request, h) {
//     if (!request.payload.name) {
//         return h.response({ error: 'Name is required field' }).code(400);
//     }
//     try {
//         const savedCompany = await Company.create({
//             name: request.payload.name,
//             city: request.payload.city,
//             address: request.payload.address
//         });
//         return h.response(savedCompany).code(201);
//     } catch (err) {
//         return h.response({ error: err.message }).code(500);
//     }
// }

// async function find(_request, h) {
//     try {
//         const findAllCompanies = await Company.find();
//         if (findAllCompanies.length === 0) {
//             return h.response([]).code(200);
//         }
//         return h.response(findAllCompanies).code(200);
//     } catch (err) {
//         return h.response({ error: 'Erro interno do servidor' }).code(500);
//     }
// }

// async function findOne(request, h) {
//     const { id } = request.params;
//     if (!id) {
//         return h.response({ err: 'Id is required param' }).code(400);
//     }
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return h.response({ err: 'Invalid ID!' }).code(400);
//     }
//     try {
//         const findCompanies = await Company.findById(request.params.id);
//         if (!findCompanies) {
//             return h.response([]).code(200);
//         }
//         return h.response(findCompanies).code(200);
//     } catch (err) {
//         return h.response({ error: 'Erro interno do servidor' }).code(500);
//     }
// }

// async function update(request, h) {
//     const { id } = request.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return h.response({ err: 'Invalid ID!' }).code(400);
//     }
//     let attributes = {};
//     if (request.payload.name) attributes.name = request.payload.name;
//     if (request.payload.city) attributes.city = request.payload.city;
//     if (request.payload.address) attributes.address = request.payload.address;
//     if (Object.keys(attributes).length === 0) {
//         return h.response({ error: 'No fields to update' }).code(400);
//     }
//     try {
//         const company = await Company.findByIdAndUpdate(id, attributes, { new: true });
//         if (!company) {
//             return h.response({ error: 'Company not found' }).code(404);
//         }
//         return h.response(company).code(200);
//     } catch (err) {
//         return h.response({ error: 'Internal server error' }).code(500);
//     }
// }

// async function deleteCompany(request, h) {
//     const { id } = request.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return h.response({ err: 'Invalid ID!' }).code(400);
//     }
//     try {
//         const deleteCompany = await Company.findByIdAndDelete(id);
//         if (!deleteCompany) {
//             return h.response({ error: 'Company not found'}).code(404);
//         }
//         return h.response({ message: `Company has been deleted with id - ${id}` }).code(200);
//     } catch (err) {
//         return h.response({ error: 'Internal server error' }).code(500);
//     }
// }

// 
// module.exports = {
//     create,
//     find,
//     findOne,
//     update,
//     delete: deleteCompany
// };
