import bcrypt from "bcrypt";
import client from "../../client";
import {protectResolver} from "../users.utils";
import fs from "fs";

const resolverFn = async (
    _,
    { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser, protectedResolver }
    ) => {
    const { filename, createReadStream } = await avatar;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + filename);
    readStream.pipe(writeStream);

    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id
        },
        data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(uglyPassword && {password: uglyPassword}),
        },
    });
    if (updatedUser.id) {
        return {
            ok: true,
        };
    } else {
        return {
            ok: false,
            error: "Could not update profile.",
        };
    }
};

export default {
    Mutation: {
        editProfile: protectResolver(resolverFn),
    },
};