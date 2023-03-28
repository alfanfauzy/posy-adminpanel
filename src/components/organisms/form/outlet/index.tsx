/**
 * User Manage Outlet Form Modal
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormManageOutletEntities, ObjectSelect } from './entities'
import { useForm } from '@/hooks/useForm'
import { ManageOutletFormSchema } from '@/schemas/outlet'
import { useGetRestaurantViewModal } from '@/view/restaurant/view-models/GetRestaurantViewModel'
import { GetFilterRestaurantInput } from '@/domain/restaurant/repositories/RestaurantRepository'
import { Restaurant } from '@/domain/restaurant/models'
import HRLine from '@/atoms/horizontalLine'
import { useGetProvinceViewModal } from '@/view/region/view-models/GetProvinceViewModel'
import {
  GetFilterCityInput,
  GetFilterDistrictInput,
  GetFilterProvinceInput,
  GetFilterSubDistrictInput,
} from '@/domain/region/repository/RegionRepositories'
import { City, District, Province, SubDistrict } from '@/domain/region/models'
import { useGetCityViewModal } from '@/view/region/view-models/GetCityViewModel'
import { useGetDistrictViewModal } from '@/view/region/view-models/GetDistrictViewModel'
import { useGetSubDistrictViewModal } from '@/view/region/view-models/GetSubDistrictViewModel'
import { useCreateOutletViewModal } from '@/view/outlet/view-models/CreateOutletViewModel'
import { FormOutlet, Outlet } from '@/domain/outlet/models'
import { useUpdateOutletViewModal } from '@/view/outlet/view-models/UpdateOutletViewModel'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormManageOutletProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: Outlet | Record<string, never>
  handleRefetch: () => void
}

const MoleculesFormManageOutlet = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
  handleRefetch,
}: MoleculesFormManageOutletProps) => {
  const refSelectCity: React.MutableRefObject<any> = useRef()
  const refSelectDistrict: React.MutableRefObject<any> = useRef()
  const refSelectSubDistrict: React.MutableRefObject<any> = useRef()

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    schema: ManageOutletFormSchema,
    mode: 'onChange',
  })

  const [province_id, setProvince_id] = useState<
    ObjectSelect | Record<string, never>
  >({})
  const [stateCity_id, setCity_id] = useState<ObjectSelect | undefined | null>(
    null,
  )
  const [stateDistrict_id, setDistrict_id] = useState<
    ObjectSelect | undefined | null
  >(null)
  const [stateSubdistrict_id, setSubDistrict] = useState<
    ObjectSelect | undefined | null
  >(null)

  const hooksParamsRestaurant: GetFilterRestaurantInput = {
    search: [],
    sort: { field: 'created_at', value: 'desc' },
    page: 1,
    limit: 0,
  }

  const hooksParamsProvince: GetFilterProvinceInput = {
    search: [],
    sort: { field: 'created_at', value: 'desc' },
    page: 1,
    limit: 0,
  }

  const hooksParamsCity: GetFilterCityInput = useMemo(() => {
    const getId = province_id?.value?.toString() || '0'
    return {
      search: [{ field: 'province_id', value: getId }],
      sort: { field: 'created_at', value: 'desc' },
      page: 1,
      limit: 0,
    }
  }, [province_id])

  const hooksParamsDistrict: GetFilterDistrictInput = useMemo(() => {
    const getId = stateCity_id?.value?.toString() || '0'
    return {
      search: [{ field: 'city_id', value: getId }],
      sort: { field: 'created_at', value: 'desc' },
      page: 1,
      limit: 0,
    }
  }, [stateCity_id])

  const hooksParamsSubDistrict: GetFilterSubDistrictInput = useMemo(() => {
    const getId = stateDistrict_id?.value?.toString() || '0'
    return {
      search: [{ field: 'district_id', value: getId }],
      sort: { field: 'created_at', value: 'desc' },
      page: 1,
      limit: 0,
    }
  }, [stateDistrict_id])

  const { data: ListRestaurant, isLoading: isLoadingRestaurant } =
    useGetRestaurantViewModal(hooksParamsRestaurant)

  const { data: ListProvince, isLoading: isLoadingProvince } =
    useGetProvinceViewModal(hooksParamsProvince)

  const { data: ListCity, isLoading: isLoadingCity } =
    useGetCityViewModal(hooksParamsCity)

  const { data: ListDistrict, isLoading: isLoadingDistrict } =
    useGetDistrictViewModal(hooksParamsDistrict)

  const { data: ListSubDistrict, isLoading: isLoadingSubDistrict } =
    useGetSubDistrictViewModal(hooksParamsSubDistrict)

  const RestaurantSelect = useMemo(() => {
    if (!ListRestaurant) return []

    return Object.values(ListRestaurant).map((restaurant: Restaurant) => ({
      label: restaurant.name,
      value: restaurant.uuid,
    }))
  }, [ListRestaurant])

  const ProvinceSelect = useMemo(() => {
    if (!ListProvince) return []

    return Object.values(ListProvince).map((province: Province) => ({
      label: province.name,
      value: province.id,
    }))
  }, [ListProvince])

  const CitySelect = useMemo(() => {
    if (!ListCity) return []

    return Object.values(ListCity).map((city: City) => ({
      label: city.name,
      value: city.id,
    }))
  }, [ListCity])

  const DistrictSelect = useMemo(() => {
    if (!ListDistrict) return []

    return Object.values(ListDistrict).map((district: District) => ({
      label: district.name,
      value: district.id,
    }))
  }, [ListDistrict])

  const SubDistrictSelect = useMemo(() => {
    if (!ListSubDistrict) return []

    return Object.values(ListSubDistrict).map((subdistrict: SubDistrict) => ({
      label: subdistrict.name,
      value: subdistrict.id,
    }))
  }, [ListSubDistrict])

  const handleCloseModal = () => {
    reset()
    handleClose()
    handleRefetch()
  }

  const { createOutlet, isLoading: isLoadingCreate } = useCreateOutletViewModal(
    {
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully added new outlet')
      },
    },
  )

  const { updateOutlet, isLoading: isLoadingUpload } = useUpdateOutletViewModal(
    {
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully update outlet')
      },
    },
  )

  const handleSubmitForm = (data: FormManageOutletEntities) => {
    const newPayload: FormOutlet = {
      restaurant_uuid: data.restaurant_uuid.value,
      outlet_name: data.outlet_name,
      outlet_code: data.outlet_code,
      subdistrict_id: stateSubdistrict_id?.value,
      address: data?.address,
      latitude: data?.latitude,
      longitude: data?.longitude,
      phone: data?.phone,
      email: data?.email,
    }

    if (isEdit) {
      const newUpdatePayload = {
        id: selectedData.uuid,
        payload: newPayload,
      }
      updateOutlet(newUpdatePayload)
    } else {
      createOutlet(newPayload)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const {
        restaurant_name,
        restaurant_uuid,
        outlet_name,
        outlet_code,
        address,
        phone,
        latitude,
        longitude,
        email,
        provincy_id,
        provincy_name,
        city_id,
        city_name,
        district_id,
        district_name,
        subdistrict_id,
        subdistrict_name,
      } = selectedData

      setValue('restaurant_uuid', {
        label: restaurant_name,
        value: restaurant_uuid,
      })

      if (province_id && provincy_name) {
        setValue('province_id', {
          label: provincy_name,
          value: provincy_id,
        })
      }

      if (city_id && city_name) {
        setValue('city_id', {
          label: city_name,
          value: city_id,
        })
      }

      if (district_id && district_name) {
        setValue('district_id', {
          label: district_name,
          value: district_id,
        })
      }

      if (subdistrict_id && subdistrict_name) {
        setValue('subdistrict_id', {
          label: subdistrict_name,
          value: subdistrict_id,
        })
      }

      setValue('outlet_name', outlet_name)
      setValue('outlet_code', outlet_code)
      setValue('address', address)
      setValue('phone', phone)
      setValue('latitude', latitude)
      setValue('longitude', longitude)
      setValue('email', email)
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Outlet' : 'Create New Outlet'

  return (
    <ModalForm
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={titleText}
    >
      <section className="w-[750px] p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            {!isEdit && (
              <Select
                name="restaurant_uuid"
                onChange={(e) => setValue('restaurant_uuid', e)}
                options={RestaurantSelect}
                labelText="Restaurant"
                placeholder="ex: Select Restaurant"
                className="flex items-center justify-center"
                error={!!errors.restaurant_uuid}
                helperText={errors?.restaurant_uuid?.message}
                isLoading={isLoadingRestaurant}
              />
            )}
          </div>

          <div className="flex w-full gap-2">
            <div className="mb-6 w-1/3">
              <Input
                {...register('outlet_code')}
                labelText="Outlet Code:"
                type="text"
                placeholder="ex: KFC-1"
                error={!!errors?.outlet_code}
                helperText={errors?.outlet_code?.message}
              />
            </div>

            <div className="mb-6 w-1/3">
              <Input
                {...register('outlet_name')}
                labelText="Outlet:"
                type="text"
                placeholder="ex: Outlet"
                error={!!errors?.outlet_name}
                helperText={errors?.outlet_code?.message}
              />
            </div>

            <div className="mb-6 w-1/3">
              <Input
                {...register('table', {
                  setValueAs: (v) => v.replace(/\D/, ''),
                })}
                labelText="Total Table:"
                type="text"
                placeholder="ex: 20"
                error={!!errors?.table}
                helperText={errors?.table?.message}
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="mb-6 w-1/2">
              <Input
                {...register('phone', {
                  setValueAs: (v) => v.replace(/\D/, ''),
                })}
                value={watch('phone')}
                className="w-52"
                labelText="Phone:"
                type="text"
                placeholder="ex: 082123456789"
                error={!!errors?.phone}
                helperText={errors?.phone?.message}
              />
            </div>

            <div className="mb-6 w-1/2">
              <Input
                {...register('email')}
                className="w-52"
                labelText="Email:"
                type="string"
                placeholder="ex: mail@mail.com"
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </div>
          </div>

          <HRLine text="Outlet Address" />

          <Select
            name="province_id"
            onChange={(e) => {
              setValue('province_id', e)
              setProvince_id(e)
              refSelectCity.current.clearValue()
            }}
            value={watch('province_id')}
            options={ProvinceSelect}
            labelText="Province:"
            placeholder="ex: Select Province"
            className="flex items-center justify-center"
            error={!!errors.province_id}
            helperText={errors?.province_id?.message}
            isLoading={isLoadingProvince}
            isClearable
          />

          <Select
            ref={refSelectCity}
            name="city_id"
            onChange={(e) => {
              setValue('city_id', e)
              setCity_id(e)
              refSelectDistrict.current.clearValue()
            }}
            value={watch('city_id')}
            options={CitySelect}
            labelText="City:"
            placeholder="ex: Select City"
            className="flex items-center justify-center"
            error={!!errors.city_id}
            helperText={errors?.city_id?.message}
            isLoading={isLoadingCity}
            disabled={
              getValues('province_id') === undefined ||
              getValues('province_id') === null
            }
          />

          <Select
            ref={refSelectDistrict}
            name="district_id"
            onChange={(e) => {
              setValue('district_id', e)
              setDistrict_id(e)
              refSelectSubDistrict.current.clearValue()
            }}
            value={watch('district_id')}
            options={DistrictSelect}
            labelText="District:"
            placeholder="ex: Select District"
            className="flex items-center justify-center"
            error={!!errors.district_id}
            helperText={errors?.district_id?.message}
            isLoading={isLoadingDistrict}
            disabled={
              getValues('city_id') === undefined ||
              getValues('city_id') === null
            }
          />

          <Select
            ref={refSelectSubDistrict}
            name="subdistrict_id"
            onChange={(e) => {
              setValue('subdistrict_id', e)
              setSubDistrict(e)
            }}
            value={watch('subdistrict_id')}
            options={SubDistrictSelect}
            labelText="Sub District:"
            placeholder="ex: Select Sub District"
            className="flex items-center justify-center"
            error={!!errors.subdistrict_id}
            helperText={errors?.subdistrict_id?.message}
            isLoading={isLoadingSubDistrict}
            disabled={
              getValues('district_id') === undefined ||
              getValues('district_id') === null
            }
          />

          <div className="mb-6">
            <Input
              {...register('address')}
              className="w-52"
              labelText="Address:"
              type="text"
              placeholder="ex: Jalan Raya No. 1"
              error={!!errors?.address}
              helperText={errors?.address?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('longitude')}
              className="w-52"
              labelText="Longitude:"
              type="text"
              placeholder="ex: -6.175969197650049"
              error={!!errors?.longitude}
              helperText={errors?.longitude?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('latitude')}
              className="w-52"
              labelText="Latitude:"
              type="text"
              placeholder="ex: 106.81494599676718"
              error={!!errors?.latitude}
              helperText={errors?.latitude?.message}
            />
          </div>

          <Button
            isLoading={isLoadingCreate || isLoadingUpload}
            type="submit"
            variant="primary"
            size="l"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <AiOutlineCheckSquare />
            Submit
          </Button>
        </form>
      </section>
    </ModalForm>
  )
}

export default MoleculesFormManageOutlet
