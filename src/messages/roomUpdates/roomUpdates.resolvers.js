import pubsub from "../../pubsub";
import {NEW_MESSAGE} from "../../constants";
import {withFilter} from "apollo-server-express";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_MESSAGE),
                (payload, {id}) => {
                    return payload.roomUpdates.roomId === id;
                }
            )
        }
    }
}