import {protectResolver} from "../../users/users.utils";
import client from "../../client";

export default {
    Query: {
        seeRoom: protectResolver((_, {id}, {loggedInUser}) => client.room.findFirst({
            where: {
                id,
                users: {
                    some: {
                        id: loggedInUser.id
                    }
                }
            },
        }))
    }
}