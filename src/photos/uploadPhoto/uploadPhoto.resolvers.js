import {protectResolver} from "../../users/users.utils";
import client from "../../client";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, { file, caption }, {loggedInUser}) => {
            if(caption) {
                let hashtagObj = [];
                const hashtags = caption.match(/#[\w]+/g);
                hashtagObj = hashtags.map(hashtag => ({where: {hashtag}, create:{hashtag}}));
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

            // save the photo WITH parsed hashtags
            // add the photo to the hashtags
        })
    }
}