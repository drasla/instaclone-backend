import {protectResolver} from "../../users/users.utils";
import client from "../../client";
import {processhashtags} from "../photos.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, { file, caption }, {loggedInUser}) => {
            let hashtagObj = [];
            if(caption) {
                hashtagObj = processhashtags(caption);
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        ...(hashtags.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj
                            }
                        })
                    }
                })
            }
        })
    }
}