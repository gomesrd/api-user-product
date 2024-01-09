import {z} from 'zod';
import {buildJsonSchemas} from 'fastify-zod'
import {emailInvalid, emailRequired, passwordInvalid, passwordRequired} from "./user.mesages";

const userCore = {
    email: z.string({
        required_error: emailRequired(),
        invalid_type_error: emailInvalid(),
    }).email(),
    name: z.string(),

}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: passwordRequired(),
        invalid_type_error: passwordInvalid()
    })
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
});

const updateUserSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
});

export const getUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
    createdAt: z.date(),
    updatedAt: z.date(),
});


const userDelete = {
    id: z.number()
}

const getUser = {
    id: z.number()
}

const loginSchema = z.object({
    email: z.string({
        required_error: emailRequired(),
        invalid_type_error: emailInvalid()
    }).email(),
    password: z.string()
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
});

const deleteUserSchema = z.object({
    ...userDelete
});

const getUserSchema = z.object({
    ...getUser
});

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type DeleteUser = z.infer<typeof deleteUserSchema>;
export type GetUser = z.infer<typeof getUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    getUserResponseSchema,
    deleteUserSchema,
    getUserSchema,
    updateUserSchema
});