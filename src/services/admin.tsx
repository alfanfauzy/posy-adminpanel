import Get from 'api/get'
import Post from 'api/post'

export const getListAdmin = async () => {
  try {
    const response = await Get({
      endpoint: `${process.env.NEXT_PUBLIC_API}/internal/user/get-list`,
    })

    return {
      status: response.code,
      data: response.data,
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const createAdmin = async () => {
  try {
    const response = await Post({
      endpoint: `${process.env.NEXT_PUBLIC_API}/internal/user/create`,
      payload: {},
    })

    return {
      status: response.code,
      data: response.data,
    }
  } catch (error) {
    throw new Error(error)
  }
}
