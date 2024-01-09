import {FastifyInstance} from "fastify";
import userRoutes from "./modules/user/user.route";
import {healthCheck} from "./infra/health-check";
import {responseSchema} from "./responseSchema";
import {loginServer} from "./modules/auth/login";
import productRoutes from "./modules/product/product.route";
import {documentation} from "./utils/documentation";
import {server} from "./app";

export async function routers(server: FastifyInstance) {
    await documentation(server);
    server.register(userRoutes, {prefix: '/users'});
    server.register(productRoutes, {prefix: '/products'});
    server.register(healthCheck)
    await loginServer(server);
    await responseSchema(server);
}