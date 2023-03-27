import React, { useState } from 'react'
import { AiOutlineCheckSquare } from 'react-icons/ai'

import { Button, Input } from 'posy-fnb-core'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Footer from '@/atoms/footer'
import { loginSchema, ValidationLoginSchema } from '@/schemas/login'
import { useForm } from '@/hooks/useForm'
import IconEye from '@/atoms/icon/IconEye'
import { useDispatchApp } from 'store/hooks'
import { authSuccess } from 'store/slice/auth'
import { useLoginViewModal } from '@/view/auth/view-models/LoginViewModel'
import { GetAccessListDataResponse } from '@/data/access/types'

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

  const GroupingAccess = (DataAccesses: object): Array<string> => {
    const getKey = Object.assign(DataAccesses).map(
      (data: GetAccessListDataResponse) => data.key.split(':')[0],
    )
    return Array.from(new Set(getKey))
  }

  const { loginPost, isLoading } = useLoginViewModal({
    onSuccess(data) {
      const permission = GroupingAccess(data.data.role_access.accesses)

      const newPayload = { ...data.data, permission }

      dispatch(authSuccess(newPayload))
      toast.success('Login Success')
      handleGoDashboard()
    },
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onLogin: SubmitHandler<ValidationLoginSchema> = () => {
    const payload = watch()

    loginPost(payload)
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
