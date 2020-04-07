import fetchPostsService from './allPosts'
import fetchCommentsService from './comments'

const services = {
  posts: fetchPostsService,
  comments: fetchCommentsService
}

export const ServiceFactory = {
  get: name => services[name]
}
