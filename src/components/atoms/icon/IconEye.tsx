/**
 * Icon Eye Component use for password component
 */

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export interface IconLoginEntities {
  value: boolean
  handlePassword: () => void
}

const IconEye = ({ value, handlePassword }: IconLoginEntities) =>
  value ? (
    <AiFillEyeInvisible onClick={handlePassword} />
  ) : (
    <AiFillEye onClick={handlePassword} />
  )

export default IconEye
