import { customAlphabet } from 'nanoid'

export const getNanoId = (length: number) => {
  const alphanumeric =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890'
  const nanoid = customAlphabet(alphanumeric, length)
  return nanoid(length)
}
