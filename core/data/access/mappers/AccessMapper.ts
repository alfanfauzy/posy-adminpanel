import {Accesss} from '@/domain/access/models';

import {GetAccessListDataResponse} from '../types';

export const mapToAccessModel = (
	datas: Array<GetAccessListDataResponse>,
): Accesss =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.name,
		key: data.key,
		description: data.description,
		is_internal: data.is_internal,
		seconds: data.metadata.created_at.seconds,
	}));
