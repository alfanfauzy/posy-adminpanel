export type SortingType = 'desc' | 'asc';

export type Sort<TField = unknown> = {
	field: TField;
	value: SortingType;
};

export type Search<TField = unknown> = {
	field: TField;
	value: string;
};

export type FilterInputVariables<TSort = unknown, TSearch = unknown> = {
	sort?: Sort<TSort>;
	search?: Array<Search<TSearch>>;
	limit?: number;
	page?: number;
};

export type ParamsPayload = {
	id?: string;
	params: object;
};
