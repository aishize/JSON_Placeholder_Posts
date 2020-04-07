import { ServiceFactory } from '@/services/ServiceFactory'
const posts = ServiceFactory.get('posts')
const comments = ServiceFactory.get('comments')

export default {
  fetchPosts: async ({ commit }) => {
    try {
      const fetched = await posts()
      const data = await fetched.data
      commit('FETCH_POSTS', data)
    } catch (err) {
      console.warn(err)
    }
  },
  fetchComments: async ({ commit }, params) => {
    try {
      const data = await comments(params)
      console.log(data)
    } catch (err) {
      console.warn(err)
    }
  },
  removePost: ({ commit }, index) => {
    commit('REMOVE_POST', index)
  },
  removePostFromId: ({ commit }, id) => {
    commit('REMOVE_POST_FROM_ID', id)
  }
}
