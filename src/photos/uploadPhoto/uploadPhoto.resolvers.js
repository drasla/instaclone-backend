import {protectResolver} from "../../users/users.utils";
import client from "../../client";
import {processhashtags} from "../photos.utils";
import {uploadToS3} from "../../shared/shared.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, caption}, {loggedInUser}) => {
            let hashtagObj = [];
            if (caption) {
                hashtagObj = processhashtags(caption);
            }
            const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
            return client.photo.create({
                data: {
                    file: fileUrl,
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

        })
    }
}