import {FastifyInstance} from "fastify";
import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    getProductsHandler, updateProductHandler
} from "./product.controller";
import {$ref} from "./product.schema";

async function productRoutes(server: FastifyInstance) {
    server.get('', {
            preHandler: [server.authenticate],
            schema: {
                tags: ['Product'],
                summary: 'Get all products',
                response: {
                    200: $ref("productsResponseSchema")
                }
            }
        }, getProductsHandler
    );

    server.get('/:id', {
            preHandler: [server.authenticate],
            schema: {
                tags: ['Product'],
                summary: 'Get a specific product',
                params: {
                    id: {type: 'number'},
                },
            }
        }, getProductHandler
    );

    server.post('', {
        preHandler: [server.authenticate],
        schema: {
            tags: ['Product'],
            summary: 'Create a new product',
            body: $ref('createProductSchema'),
            response: {
                201: $ref('productResponseSchema')
            }
        },
    }, createProductHandler);

    server.put('/:id', {
            preHandler: [server.authenticate],
            schema: {
                tags: ['Product'],
                summary: 'Update a specific product',
                params: {
                    id: {type: 'number'},
                },
                body: $ref('updateProductSchema'),
            }
        }, updateProductHandler
    );

    server.delete('/:id', {
            preHandler: [server.authenticate],
            schema: {
                tags: ['Product'],
                summary: 'Delete a specific product',
                params: {
                    id: {type: 'number'},
                },
            }
        }, deleteProductHandler
    );
}

export default productRoutes;