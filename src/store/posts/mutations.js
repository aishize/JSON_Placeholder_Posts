export default {
  FETCH_POSTS: (state, data) => {
    state.posts = data
  },
  REMOVE_POST: (state, index) => {
    state.posts = state.posts.filter((item, n) => index !== n)
  },
  REMOVE_POST_FROM_ID: (state, id) => {
    state.posts = state.posts.filter(post => post.id !== id)
  }
}
