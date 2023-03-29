export type Response<TData = unknown> = {
	code: number;
	data: TData;
	message: string;
	more_info: string;
};

export type BaseResponseDataList<T> = {
	curr_page: number;
	total_page: number;
	total_objs: number;
	per_page: number;
	objs: Array<T>;
};

export type ParamsObject = {
	field: string;
	value: string;
};

export type Params = {
	search?: Array<ParamsObject>;
	sort?: ParamsObject;
	page?: number;
	limit?: number;
};
