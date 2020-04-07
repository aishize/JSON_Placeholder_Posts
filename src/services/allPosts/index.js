import instance from '../instance'

export default () => {
  return instance.get('/posts')
}
