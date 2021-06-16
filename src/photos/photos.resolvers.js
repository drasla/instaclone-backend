export default {
    Photo: {
        user: ({userId}) => client.user.findUnique({ where: { id: userId }}),
        hashtags: ({id}) => client.hashtag.findMany({ where: { photos: { some: {id}}}})
    },
    hashtag: {
        totalPhotos: ({id}) => client.photo.count({ where: {hashtags: { some: {id}}}}),
        photos: ({id}, {page}, { loggedInUser }) => {
            return client.hashtag.findUnique({ where: {id}})
                .photos();
        }

    }

}