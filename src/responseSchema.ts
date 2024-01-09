import {userSchemas} from "./modules/user/user.schema";
import {productSchemas} from "./modules/product/product.schema";
import {FastifyInstance} from "fastify";

export async function responseSchema(server: FastifyInstance) {

    for (const schema of [...userSchemas, ...productSchemas]
        ) {
        server.addSchema(schema)
    }

}