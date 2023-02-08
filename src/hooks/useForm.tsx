import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { yupResolver } from '@hookform/resolvers/yup'

export const useForm = ({ schema, ...formConfig }) => {
  const form = useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  })

  return { form, ...form }
}
