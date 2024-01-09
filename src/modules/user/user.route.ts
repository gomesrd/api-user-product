import {FastifyInstance} from "fastify";
import {
    deleteUserHandler,
    getUserHandler,
    getUsersHandler,
    loginHandler,
    registerUserHandler, updateUserHandler
} from "./user.controller";
import {$ref} from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.get('', {
        preHandler: [server.authenticate],
        schema: {
            tags: ['User'],
            summary: 'Get all users',
            response: {
                200: {
                    type: 'array',
                    items: $ref('getUserResponseSchema')
                },
            },

        },
    }, getUsersHandler);

    server.get('/:id', {
        preHandler: [server.authenticate],
        schema: {
            tags: ['User'],
            summary: 'Get a specific user',
            params: {
                id: {type: 'number'},
            },
            response: {
                200: $ref('getUserResponseSchema')
            }
        },
    }, getUserHandler);

    server.post('', {
        preHandler: [server.authenticate],
        schema: {
            tags: ['User'],
            body: $ref('createUserSchema'),
            summary: 'Create a new user',
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, registerUserHandler);

    server.put('/:id', {
            preHandler: [server.authenticate],
            schema: {
                tags: ['User'],
                summary: 'Update a specific user',
                params: {
                    id: {type: 'number'},
                },
                body: $ref('updateUserSchema'),
                response: {
                    200: $ref('getUserResponseSchema')
                }
            }
        }, updateUserHandler
    );

    server.post('/login', {
        schema: {
            tags: ['User'],
            body: $ref('loginSchema'),
            summary: 'Login in the application',
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler);

    server.delete('/:id', {
            preHandler: [server.authenticate],
            schema: {
                tags: ['User'],
                summary: 'Delete a specific user',
                params: {
                    id: {type: 'number'},
                },
            }
        }, deleteUserHandler
    );
}

export default userRoutes;