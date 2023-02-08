import { Select } from 'posy-fnb-core'

interface PaginationProps {
  onChangePagination: (e: { value: number }) => void
  total: number
  limitSize: number
}

interface PaginationSelectProps {
  onChangePagination: (e: { value: number }) => void
  limitSize: number
}

const PaginationSelect = ({
  onChangePagination,
  limitSize,
}: PaginationSelectProps) => {
  const pageSizeOptions = [10, 20, 30, 40, 50]

  const options = pageSizeOptions.map((data: number) => ({
    value: Number(data),
    label: `${data}`,
  }))

  return (
    <Select
      size="m"
      value={{ label: limitSize.toString(), value: limitSize }}
      onChange={onChangePagination}
      style={{ width: 'auto' }}
      options={options}
    />
  )
}

const Pagination = ({
  onChangePagination,
  total,
  limitSize,
}: PaginationProps) => (
  <span className="w-64 absolute left-0 flex items-center justify-center gap-2">
    Showing
    <PaginationSelect
      onChangePagination={onChangePagination}
      limitSize={limitSize}
    />
    of {total}
  </span>
)

export default Pagination
