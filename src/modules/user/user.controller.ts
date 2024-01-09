import {FastifyReply, FastifyRequest} from "fastify";
import {createUser, deleteUser, findUser, findUserByEmail, findUsers, updateUser} from "./user.service";
import {CreateUserInput, DeleteUser, GetUser, LoginInput, UpdateUser} from "./user.schema";
import {confirmDeletedUser, invalidLoginMessage} from "./user.mesages";
import {verifyPassword} from "../../utils/hash";
import {server} from "../../app";

export async function registerUserHandler(request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply) {
    const body = request.body;
    try {
        const user = await createUser(body);
        return reply.code(201).send(user)
    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput
}>, reply: FastifyReply) {
    const body = request.body;

    const user = await findUserByEmail(body.email);

    if (!user) {
        return reply.code(401).send(invalidLoginMessage())
    }

    const correctPassword = verifyPassword(
        {
            candidatePassword: body.password,
            salt: user.salt,
            hash: user.password
        }
    )

    if (correctPassword) {
        const {password, salt, ...rest} = user;

        return {accessToken: server.jwt.sign(rest)};
    }

    return reply.code(401).send(invalidLoginMessage());
}


export async function getUsersHandler() {
    try {
        return findUsers();
    } catch (e) {
        console.log(e)
    }
}

export async function deleteUserHandler(request: FastifyRequest<{
    Params: DeleteUser;
}>, reply: FastifyReply) {

    await deleteUser({
        ...request.params,
        ownerId: request.user.id
    });

    return reply.code(200).send(confirmDeletedUser());
}

export async function getUserHandler(request: FastifyRequest<{
    Params: GetUser;
}>) {

    return findUser({
        ...request.params,
        ownerId: request.user.id
    });

}

export async function updateUserHandler(request: FastifyRequest<{
    Body: UpdateUser;
    Params: GetUser;
}>) {

    return updateUser({
        ...request.body
    }, {...request.params,});

}