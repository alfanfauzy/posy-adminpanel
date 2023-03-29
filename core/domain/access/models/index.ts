export type AccessBased = {
	uuid: string;
	name: string;
	key: string;
	description: string;
	seconds: number;
	is_internal: boolean;
};

export type Access = AccessBased;

export type Accesss = Array<AccessBased>;

export type FormAccess = {
	name: string;
	key: string;
	description: string;
};

export type TempAccess = Omit<AccessBased, 'seconds'>;
