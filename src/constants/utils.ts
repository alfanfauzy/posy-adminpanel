import { customAlphabet } from 'nanoid'
import moment from 'moment'

export const getNanoId = (length: number) => {
  const alphanumeric =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890'
  const nanoid = customAlphabet(alphanumeric, length)
  return nanoid(length)
}

export const PASSWORD_REGEX =
  /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-.]).{8,50}$/

export const timeStampConverter = (
  timestamp: number,
  formatConvert: string,
) => {
  const times = moment.unix(timestamp)
  return times.format(formatConvert)
}
