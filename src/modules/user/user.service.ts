import prisma from "../../utils/prisma";
import {CreateUserInput, DeleteUser, GetUser, UpdateUser} from "./user.schema";
import {hashPassword} from "../../utils/hash";
import {DeleteProduct} from "../product/product.schema";

export async function createUser(input: CreateUserInput) {
    const {password, ...rest} = input;
    const {hash, salt} = hashPassword(password);

    const user = await prisma.user.create({
        data: {...rest, salt, password: hash},
    });

    return user;
}


export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {email},
    });

}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            salt: false,
            password: false,
        }
    });
}

export async function deleteUser(data: DeleteUser & {
    ownerId: number,
}) {
    return prisma.user.delete({
        where: {
            id: data.id
        }
    })
}

export async function findUser(data: GetUser & {
    ownerId: number
}) {
    return prisma.user.findUnique({
        where: {
            id: data.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            salt: false,
            password: false,
        }
    });
}

export async function updateUser(data: UpdateUser, params: GetUser) {
    return prisma.user.update({
        where: {
            id: params.id
        },
        data: {
            name: data.name,
            email: data.email,
        }
    });
}
