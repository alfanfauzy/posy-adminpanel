import {Loading} from '@/atoms/loading';
import VerticalTabs from '@/atoms/verticalTabs';
import {GetAccessListDataResponse} from '@/data/access/types';
import {TempAccess} from '@/domain/access/models';
import {GetRolesInput} from '@/domain/role/repositories/RoleRepository';
import {useGetAccessViewModal} from '@/view/access/view-modals/GetAccessViewModel';
import {useGetRolesViewModal} from '@/view/role/view-modals/GetRolesViewModel';
import {useCreateRoleAccessViewModal} from '@/view/roleaccess/view-modals/CreateRoleAccessViewModel';
import {Empty} from 'antd';
import {Role} from 'core/domain/role/models/index';
import {Button} from 'posy-fnb-core';
import React, {useMemo, useState} from 'react';
import {toast} from 'react-toastify';

import {AccessByGroup, AccessSettingLayoutProps} from './entities';

const GroupingAccess = (DataAccesses: object): Array<AccessByGroup> => {
	const mapAccessPermission: Array<AccessByGroup> = [];

	Object.assign(DataAccesses).forEach((access: GetAccessListDataResponse) => {
		/**
		 * Split string key to get first string before :
		 * etc: access, product, role
		 */
		const groupKey = access.key.split(':')[0];

		/**
		 * Filter data access where the key is same like group key
		 */
		const getAccessByKey = Object.assign(DataAccesses).filter(
			(data: GetAccessListDataResponse) => {
				const keyAccess = data.key.split(':')[0];

				return keyAccess === groupKey;
			},
		);

		const isDataNotExist =
			mapAccessPermission.filter(e => e.group === groupKey).length === 0;

		/** Check If data not exist then push object to array */
		if (isDataNotExist) {
			mapAccessPermission.push({group: groupKey, access: getAccessByKey});
		}
	});

	return mapAccessPermission;
};

const AccessSettingLayout = ({type}: AccessSettingLayoutProps) => {
	const [selectedRole, setSelectedRole] = useState({id: '0', name: ''});
	const [tempAccess, setTempAccess] = useState<Array<TempAccess>>([]);

	const hooksParams: GetRolesInput = {
		search: [
			{field: 'is_internal', value: type === 'admin' ? 'true' : 'false'},
		],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const {
		data: DataRoles,
		isLoading: isLoadingRole,
		refetch: refetchDataRole,
	} = useGetRolesViewModal(hooksParams);

	const {
		data: DataAccesses,
		isLoading: isLoadingAccess,
		refetch: refetchDataAccess,
	} = useGetAccessViewModal(hooksParams);

	const {createRoleAccess, isLoading} = useCreateRoleAccessViewModal({
		onSuccess() {
			toast.success('Success save setting');
			refetchDataAccess();
			refetchDataRole();
		},
	});

	/**
   * Return to new Array newDataRole
   * [
   *  {
   *    accesses : []
        id : "a66290fd-e21f-45ba-8dae-f7aa030e8b6b"
        name : "Customer Support"
   *  }
   * ]
   */
	const newDataRole = useMemo(() => {
		if (!DataRoles) return [];

		return Object.assign(DataRoles).map((role: Role) => ({
			id: role.uuid,
			name: role.name,
			accesses: role.accesses,
		}));
	}, [DataRoles]);

	/**
	 * Return to new Array and Grouping by key
	 * [
	 *  {
	 *    access : []
	 *    group : "report"
	 *  }
	 * ]
	 */
	const newDataAccess = useMemo(() => {
		if (!DataAccesses) return [];

		return GroupingAccess(DataAccesses);
	}, [DataAccesses]);

	const handleSubmit = () => {
		const {id: role_uuid} = selectedRole;

		const access_uuids = tempAccess.map(access => access.uuid);

		const payload = {
			role_uuid,
			access_uuids,
		};

		createRoleAccess(payload);
	};

	if (newDataAccess.length === 0 && newDataRole.length === 0) {
		return (
			<div className="m-auto mt-3 flex justify-center rounded-lg border-2 border-gray-200 p-5">
				<Empty />
			</div>
		);
	}

	return (
		<main className="mt-4">
			{isLoadingRole && isLoadingAccess ? (
				<section className="mx-[50%]">
					<Loading size={50} />
				</section>
			) : (
				<VerticalTabs
					dataRoles={newDataRole}
					dataAccesses={newDataAccess}
					tempAccess={tempAccess}
					setSelectedRole={setSelectedRole}
					setTempAccess={setTempAccess}
				/>
			)}
			<section className="text-right">
				<Button
					type="submit"
					onClick={() => handleSubmit()}
					isLoading={isLoading}
				>
					Save Setting
				</Button>
			</section>
		</main>
	);
};

export default AccessSettingLayout;
