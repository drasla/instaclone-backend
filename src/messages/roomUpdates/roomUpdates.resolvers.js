import pubsub from "../../pubsub";
import {NEW_MESSAGE} from "../../constants";
import {withFilter} from "apollo-server-express";
import client from "../../client";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async(root, args, context, info) => {
                const room = await client.room.findUnique({
                    where: {
                        id: args.id
                    },
                    select: {
                        id: true
                    }
                });
                if(!room) {
                    throw new Error("You shall not see this.");
                }

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    (payload, {id}) => {
                        return payload.roomUpdates.roomId === id;
                    }
                )(root, args, context, info);
            }
        }
    }
}