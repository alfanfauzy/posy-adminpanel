import React, { useState } from 'react'
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCheckSquare,
} from 'react-icons/ai'

import { Button, Input } from 'posy-fnb-ds'
import { useRouter } from 'next/router'
import { IconLoginEntities } from './entities'
import AtomDefaultCard from '@/atoms/card'
import Footer from '@/atoms/footer'
import { loginSchema } from '@/schemas/login'
import { useForm } from '@/hooks/useForm'

const Icon = (props: IconLoginEntities) => {
  const { value, handlePassword } = props

  return value ? (
    <AiFillEyeInvisible onClick={handlePassword} />
  ) : (
    <AiFillEye onClick={handlePassword} />
  )
}

const MoleculesLogin = () => {
  const [showPassword, setShowPassword] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    schema: loginSchema,
  })

  const router = useRouter()

  const handleGoDashboard = () => {
    router.push('/dashboard')
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onLogin = () => {
    handleGoDashboard()
  }

  return (
    <div className="bg-gray-300 bg-opacity-40 w-full flex items-center justify-center h-screen">
      <AtomDefaultCard
        className="w-1/3 drop-shadow-lg h-auto mb-10"
        bordered={false}
      >
        <p className="heading-s-semibold mb-10 text-center">Login</p>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-6">
            <Input
              {...register('email')}
              labelText="Email"
              type="text"
              placeholder="Input your email"
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
          </div>
          <div className="mb-6">
            <Input
              {...register('password')}
              labelText="Password"
              placeholder="Input your password"
              className="flex justify-center items-center"
              type={showPassword ? 'password' : 'text'}
              endAdornment={
                <Icon
                  value={showPassword}
                  handlePassword={handleShowPassword}
                />
              }
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="l"
            fullWidth
            className="flex justify-center items-center gap-2"
          >
            <AiOutlineCheckSquare />
            Button
          </Button>
        </form>

        <Footer />
      </AtomDefaultCard>
    </div>
  )
}

export default MoleculesLogin
