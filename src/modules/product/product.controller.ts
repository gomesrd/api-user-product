import {FastifyReply, FastifyRequest} from "fastify";
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "./product.service";
import {CreateProductInput, DeleteProduct, GetProduct, UpdateProduct} from "./product.schema";
import {confirmDeletedProduct} from "./product.mesages";
import {updateUser} from "../user/user.service";

export async function createProductHandler(request: FastifyRequest<{
    Body: CreateProductInput;
}>) {
    return await createProduct({
        ...request.body,
        ownerId: request.user.id
    });
}

export async function getProductsHandler() {
    return getProducts();
}

export async function deleteProductHandler(request: FastifyRequest<{
    Params: DeleteProduct;
}>, reply: FastifyReply) {

    await deleteProduct({
        ...request.params,
        ownerId: request.user.id
    });
    return reply.code(200).send(confirmDeletedProduct());
}

export async function getProductHandler(request: FastifyRequest<{
    Params: GetProduct;
}>) {

    return getProduct({
        ...request.params,
        ownerId: request.user.id
    });
}

export async function updateProductHandler(request: FastifyRequest<{
    Body: UpdateProduct;
    Params: GetProduct;
}>) {

    return updateProduct({
        ...request.body,
        ownerId: request.user.id
    }, {...request.params});

}