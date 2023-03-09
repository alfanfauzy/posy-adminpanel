import { useGetAdminUsecase } from '@/data/admin/usecases/GetAdminsUsecase'
import {
  GetAdminsResult,
  GetFilterAdminInput,
} from '@/domain/admin/repositories/AdminRepository'

export const useGetAdminViewModal = (
  input?: GetFilterAdminInput,
): GetAdminsResult => {
  const result = useGetAdminUsecase(input)

  return result
}
