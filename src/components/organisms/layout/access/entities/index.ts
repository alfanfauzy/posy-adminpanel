import {GetAccessListDataResponse} from '@/data/access/types';

export type AccessByGroup = {
	group: string;
	access: Array<GetAccessListDataResponse>;
};

export type AccessSettingLayoutProps = {
	type: 'admin' | 'client';
	value: number;
};
