import React, { useState } from 'react'
import { AiOutlineCheckSquare } from 'react-icons/ai'

import { Button, Input } from 'posy-fnb-core'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import Footer from '@/atoms/footer'
import { loginSchema, ValidationLoginSchema } from '@/schemas/login'
import { useForm } from '@/hooks/useForm'
import IconEye from '@/atoms/icon/IconEye'
import { useDispatchApp } from 'store/hooks'
import { authSuccess } from 'store/slice/auth'
import { Login } from 'services/login'
import { LoginDataResponse } from 'shared'

const MoleculesLogin = () => {
  const router = useRouter()
  const dispatch = useDispatchApp()

  const [showPassword, setShowPassword] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    schema: loginSchema,
  })

  const handleGoDashboard = () => {
    router.push('/dashboard')
  }

  const { mutate: handleLogin, isLoading } = useMutation(Login, {
    onSuccess(data) {
      dispatch(authSuccess(data.data))
      handleGoDashboard()
    },
    onError(error) {
      console.error(error)
    },
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onLogin: SubmitHandler<ValidationLoginSchema> = () => {
    const payload = watch()

    handleLogin(payload)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-300 bg-opacity-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-10 h-auto w-big-500 rounded-md border border-slate-300 p-7 shadow-md"
      >
        <p className="mb-10 text-center text-heading-s-bold">Login</p>

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
            isLoading={isLoading}
          >
            <AiOutlineCheckSquare />
            Button
          </Button>
        </form>

        <Footer />
      </motion.div>
    </div>
  )
}

export default MoleculesLogin
