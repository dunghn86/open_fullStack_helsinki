const dummy = (blog) => {
    return 1;
}
const totalLikes = (blog) => {
    return blog.reduce((sum, index) => sum + index.likes, 0);
}

const favoriteBlogs = (blog) => {
    const favoriteBlog = blog.reduce((max, blog) => blog.likes > max.likes ? blog : max, blog[0]);
    return favoriteBlog;
}

const mostBlog = (blog) => {
    const groupByAuthor = _.groupBy(blog, 'author')
    const theMostBlog = _.map(groupByAuthor, (blog, author) => {
        return {
            author: author,
            blogs: blog.length
        }
    })
    return _.maxBy(theMostBlog, quantity)
}

const mostLikes = (blog) => {
    const groupByAuthor = _.groupBy(blog, 'author')
    const theMostLikes = _.map(groupByAuthor, (blog, author) => {
        return {
            author: author,
            likes: _.sumBy(theMostLikes, 'likes')
        }
    })
}
export { dummy, totalLikes, favoriteBlogs, mostBlog, mostLikes }