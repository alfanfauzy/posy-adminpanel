import {AccessBased, TempAccess} from '@/domain/access/models';
import {AccessByGroup} from '@/organisms/layout/access/entities';

export type RoleType = {
	id: string;
	name: string;
	accesses: Array<AccessBased>;
};

export type VerticalTabsProps = {
	dataRoles: Array<RoleType>;
	dataAccesses: Array<AccessByGroup>;
	setSelectedRole: React.Dispatch<
		React.SetStateAction<{
			id: string;
			name: string;
		}>
	>;
	tempAccess: Array<TempAccess>;
	setTempAccess: React.Dispatch<React.SetStateAction<Array<TempAccess>>>;
};

export type AccessFormProps = {
	permissionList: AccessByGroup;
	tempAccess: Array<TempAccess>;
	setTempAccess: React.Dispatch<React.SetStateAction<Array<TempAccess>>>;
};
