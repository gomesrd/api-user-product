import {CreateProductInput, DeleteProduct, GetProduct, UpdateProduct} from "./product.schema";
import prisma from "../../utils/prisma";

export async function createProduct(data: CreateProductInput & {
    ownerId: number,
}) {
    return prisma.product.create({
        data
    })
}

export async function deleteProduct(data: DeleteProduct & {
    ownerId: number,
}) {
    return prisma.product.delete({
        where: {
            id: data.id
        }
    })
}

export function getProducts() {
    return prisma.product.findMany({
        select: {
            content: true,
            title: true,
            price: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    name: true,
                    id: true,
                }
            }
        }
    })
}

export function getProduct(data: DeleteProduct & {
    ownerId: number,
}) {
    return prisma.product.findUnique({
        where: {
            id: data.id
        },
        select: {
            content: true,
            title: true,
            price: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    name: true,
                    id: true,
                }
            }
        }
    })
}

export function updateProduct(updateData: UpdateProduct & {
    ownerId: number,
}, params: GetProduct) {
    return prisma.product.update({
        where: {
            id: params.id
        },
        data: {
            content: updateData.content,
            title: updateData.title,
            price: updateData.price,
        }
    })
}