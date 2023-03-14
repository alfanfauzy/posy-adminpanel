import { useEffect, useMemo, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

interface TabsType {
  id: string
  name: string
}

interface VerticalTabsProps {
  tabsList: TabsType[]
  setSelectedRole: React.Dispatch<
    React.SetStateAction<{
      id: string
      name: string
    }>
  >
}

const VerticalTabs = ({ tabsList, setSelectedRole }: VerticalTabsProps) => {
  const [indexTabs, setIndexTabs] = useState(0)

  const getSelectedTab = useMemo(
    () => tabsList.filter((_, index) => index === indexTabs),
    [indexTabs],
  )

  useEffect(() => {
    setSelectedRole(getSelectedTab[0])
  }, [indexTabs])

  return (
    <Tabs
      className="mb-3 flex rounded-lg border border-gray-200 bg-white p-5 text-gray-700"
      selectedIndex={indexTabs}
      onSelect={(index) => setIndexTabs(index)}
    >
      <TabList>
        {Object.assign(tabsList).map((tabs: TabsType) => (
          <Tab key={tabs.id}>{tabs.name}</Tab>
        ))}
      </TabList>
      <div className="ml-2 h-full w-full">
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 6</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 7</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 8</h2>
        </TabPanel>
      </div>
    </Tabs>
  )
}

export default VerticalTabs
