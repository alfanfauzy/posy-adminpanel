import {Roles} from 'core/domain/role/models';

import {GetRoleListDataResponse} from '../types';

export const mapToRoleModel = (datas: Array<GetRoleListDataResponse>): Roles =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.name,
		description: data.description,
		is_internal: data.is_internal,
		seconds: data.metadata.created_at.seconds,
		accesses: data.accesses,
	}));
