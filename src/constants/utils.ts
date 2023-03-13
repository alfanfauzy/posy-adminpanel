import moment from 'moment'
import { ParamsObject } from 'shared/baseResponse'

export const generateUniqueId = (length: number) => {
  let result = ''
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-?/><:;}{[]\\|`
  const charactersLength = characters.length
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
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

export const findIndexArraySearch = (
  dataArray: ParamsObject[],
  field: string,
) => {
  const index = dataArray.findIndex((array) => array.field === field)

  return index
}

export const FormatToRupiah = (ammount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(ammount)
