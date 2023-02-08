import React, { useState } from 'react'
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCheckSquare,
} from 'react-icons/ai'

import { Button, Input } from 'posy-fnb-core'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { IconLoginEntities } from './entities'
import AtomDefaultCard from '@/atoms/card'
import Footer from '@/atoms/footer'
import { loginSchema, ValidationLoginSchema } from '@/schemas/login'
import { useForm } from '@/hooks/useForm'
import { useDispatchApp } from 'store/hooks'
import { authSuccess } from 'store/slice/auth'
import { useLogin } from '@/hooks/query/useLogin'
import IconEye from '@/atoms/icon/IconEye'

const MoleculesLogin = () => {
  const router = useRouter()
  //   const dispatch = useDispatchApp()

  const [showPassword, setShowPassword] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    schema: loginSchema,
  })

  const handleGoDashboard = () => {
    router.push('/dashboard')
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onLogin: SubmitHandler<ValidationLoginSchema> = () => {
    // dispatch(
    //   authSuccess({
    //     expired_at: {
    //       nanos: 12,
    //       seconds: 123,
    //     },
    //     refresh_token: '123123',
    //     token: '12312312',
    //     uuid: '12312',
    //   }),
    // )
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
                <IconEye
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
