import {JWT} from '@fastify/jwt'

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            "id": number;
            "name": string;
            "email": string;
        }
    }
}


declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }

    export interface FastifyInstance {
        authenticate: any;
    }
}
