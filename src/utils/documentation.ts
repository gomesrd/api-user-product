import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import swagger from "@fastify/swagger";
import {FastifyInstance} from "fastify";

export async function documentation(server: FastifyInstance) {

    server.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'API about user and product',
                version: '1.0.0'
            },
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    });
    server.register(fastifySwaggerUi, {routePrefix: '/docs'});

}