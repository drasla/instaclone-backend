export const processhashtags = (caption) => {
    const hashtags = caption.match(/#[\w]+/g) || [];
    return hashtags.map(hashtag => ({where: {hashtag}, create:{hashtag}}));
}