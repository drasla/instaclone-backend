import {protectResolver} from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, { file, caption }, {loggedInUser}) => {
            if(caption) {
                // parse caption
                // get or create hashtags
            }

            // save the photo WITH parsed hashtags
            // add the photo to the hashtags
        })
    }
}