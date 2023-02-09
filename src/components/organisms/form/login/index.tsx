import React, { useState } from 'react'
import { AiOutlineCheckSquare } from 'react-icons/ai'

import { Button, Input } from 'posy-fnb-core'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import AtomDefaultCard from '@/atoms/card'
import Footer from '@/atoms/footer'
import { loginSchema, ValidationLoginSchema } from '@/schemas/login'
import { useForm } from '@/hooks/useForm'
import IconEye from '@/atoms/icon/IconEye'

const MoleculesLogin = () => {
  const router = useRouter()

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
    handleGoDashboard()
  }

  return (
    <div className="w-full flex h-screen items-center justify-center bg-gray-300 bg-opacity-40">
      <AtomDefaultCard
        className="w-1/3 mb-10 h-auto drop-shadow-lg"
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
              className="flex items-center justify-center"
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
            className="flex items-center justify-center gap-2"
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
