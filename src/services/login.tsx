import Post from 'api/post'

export const Login = async () => {
  try {
    const response = await Post({
      endpoint: `${process.env.NEXT_PUBLIC_API}/user/v1/user/login`,
      payload: {},
    })

    return {
      status: response.code,
      endpoint: response.data,
    }
  } catch (error) {
    throw new Error(error)
  }
}
