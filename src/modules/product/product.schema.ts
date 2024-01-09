import {z} from 'zod'
import {buildJsonSchemas} from "fastify-zod";

const productInput = {
    title: z.string(),
    price: z.number(),
    content: z.string(),
};

const productGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    owner: z.object({
        name: z.string(),
        id: z.number(),
    }),
};

const productId = {
    id: z.number()
}

const createProductSchema = z.object({
    ...productInput,
});

const updateProductSchema = z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    content: z.string().optional(),
});

const productResponseSchema = z.object({
    ...productInput,
    ...productGenerated,
});

const deleteProductSchema = z.object({
    ...productId
});

const getProductSchema = z.object({
    ...productId
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type DeleteProduct = z.infer<typeof deleteProductSchema>;

export type GetProduct = z.infer<typeof getProductSchema>

export type UpdateProduct = z.infer<typeof updateProductSchema>


export const {schemas: productSchemas, $ref} = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema

}, {$id: "productSchemas"});