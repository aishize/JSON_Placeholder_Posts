import instance from '../instance'
const resource = '/comments'
export default id => {
  return instance.get(`${resource}?postId=${id}`)
}
