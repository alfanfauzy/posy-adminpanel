import React, { useEffect, useMemo, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { AccessByGroup } from '@/organisms/layout/access/entities'
import { AccessBased, TempAccess } from '@/domain/access/models'
import { GetAccessListDataResponse } from '@/data/access/types'

interface RoleType {
  id: string
  name: string
  accesses: AccessBased[]
}

interface VerticalTabsProps {
  dataRoles: RoleType[]
  dataAccesses: AccessByGroup[]
  setSelectedRole: React.Dispatch<
    React.SetStateAction<{
      id: string
      name: string
    }>
  >
  tempAccess: TempAccess[]
  setTempAccess: React.Dispatch<React.SetStateAction<TempAccess[]>>
}

interface AccessFormProps {
  permissionList: AccessByGroup
  tempAccess: TempAccess[]
  setTempAccess: React.Dispatch<React.SetStateAction<TempAccess[]>>
}

const AccessForm = ({
  permissionList,
  tempAccess,
  setTempAccess,
}: AccessFormProps) => {
  const { group, access } = permissionList
  const itemComponent: JSX.Element[] = []

  const handleChecked = (
    item: GetAccessListDataResponse,
    isChecked: boolean,
  ) => {
    if (!isChecked) {
      setTempAccess((prevState) => [...prevState, item])
    } else {
      setTempAccess((prevState) =>
        prevState.filter((a) => a.uuid !== item.uuid),
      )
    }
  }

  // eslint-disable-next-line array-callback-return
  access.map((item) => {
    const isChecked =
      tempAccess.findIndex((dataAcc) => dataAcc.uuid === item.uuid) !== -1

    itemComponent.push(
      <span className="flex gap-2 align-top" key={item.name}>
        <input
          className="bg-grey-700 mb-2 h-4 w-4 cursor-pointer rounded shadow checked:accent-[#00ba9b]"
          onChange={() => handleChecked(item, isChecked)}
          type="checkbox"
          value={item.uuid}
          checked={isChecked}
        />
        {item.name}
      </span>,
    )
  })

  return (
    <section className="w-[250px] p-2">
      <h1 className="mb-2 text-xl-bold capitalize">
        {group.split('_').join(' ')}
      </h1>
      <div className="ml-4 flex flex-col text-l-medium">{itemComponent}</div>
    </section>
  )
}

const VerticalTabs = ({
  dataRoles,
  dataAccesses,
  tempAccess,
  setSelectedRole,
  setTempAccess,
}: VerticalTabsProps) => {
  const [indexTabs, setIndexTabs] = useState(0)

  const getSelectedTab = useMemo(
    () => dataRoles.filter((_, index) => index === indexTabs),
    [indexTabs],
  )

  useEffect(() => {
    setSelectedRole(getSelectedTab[0])
    setTempAccess(getSelectedTab[0].accesses)
  }, [indexTabs])

  return (
    <Tabs
      className="mb-3 flex rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-700"
      selectedIndex={indexTabs}
      onSelect={(index) => setIndexTabs(index)}
    >
      <TabList>
        {Object.assign(dataRoles).map((role: RoleType) => (
          <Tab key={role.id}>{role.name}</Tab>
        ))}
      </TabList>

      <div className="ml-2 h-full w-full rounded-lg border-2 border-gray-200">
        {Object.assign(dataRoles).map((role: RoleType) => (
          <TabPanel key={role.id}>
            <div className="flex flex-wrap justify-start gap-4 overflow-y-auto">
              {dataAccesses.map((access) => (
                <AccessForm
                  key={access.group}
                  permissionList={access}
                  tempAccess={tempAccess}
                  setTempAccess={setTempAccess}
                />
              ))}
            </div>
          </TabPanel>
        ))}
      </div>
    </Tabs>
  )
}

export default VerticalTabs
