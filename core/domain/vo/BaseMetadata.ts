export type BaseMetadata = {
	seconds: number;
	nanos: number;
};

export type Metadata = {
	created_at: BaseMetadata;
	updated_at: BaseMetadata;
	deleted_at: BaseMetadata;
	last_login: BaseMetadata;
};
