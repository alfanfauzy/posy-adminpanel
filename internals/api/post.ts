// eslint-disable-next-line import/no-cycle
import axios from '.'

interface Post {
  endpoint: string
  payload?: { [key: string]: any }
  baseURL?: string
  headers?: { [key: string]: string }
  isAuth?: boolean
}

/**
 * @function Post
 * @example
 * import Post from 'internals/api/post'
 *
 * await Post({
 *  title: 'Example API',
 *  endpoint: '/internal/v1/forgot-password',
 *  payload: {
 *    email: 'johndoe@mail.com',
 *  },
 * });
 */
const Post = async ({ baseURL, endpoint, payload, headers = {} }: Post) => {
  const { status, ...response } =
    (await axios.post(endpoint, payload, {
      headers: headers || {},
      baseURL,
    })) || {}

  return {
    code: status,
    message: response.data?.message || '',
    ...response.data,
  }
}

export default Post
