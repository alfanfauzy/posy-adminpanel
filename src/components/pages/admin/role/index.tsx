import AccessSettingLayout from '@/organisms/layout/access';
import dynamic from 'next/dynamic';
import React, {useState} from 'react';

const TabsComponent = dynamic(
	() => import('posy-fnb-core').then(el => el.Tabs),
	{
		ssr: false,
	},
);

const RoleListLayout = dynamic(() => import('@/organisms/layout/role'));
const PermissionLayout = dynamic(() => import('@/organisms/layout/permission'));

const RolePermissionLayout = () => {
	const Item = [
		{label: 'Access Setting'},
		{label: 'Role'},
		{label: 'Permission'},
	];

	const [tabsVal, setTabsVal] = useState(0);

	return (
		<section>
			<div>
				<TabsComponent
					items={Item}
					value={tabsVal}
					onChange={e => setTabsVal(e)}
				/>
			</div>

			{tabsVal === 0 && <AccessSettingLayout type="admin" />}
			{tabsVal === 1 && <RoleListLayout type="admin" />}
			{tabsVal === 2 && <PermissionLayout type="admin" />}
		</section>
	);
};

export default RolePermissionLayout;
