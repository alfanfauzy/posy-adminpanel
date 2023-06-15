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

export type MetadataTime = {
	created_at: string;
	updated_at: string;
	deleted_at: string;
	last_login: string;
};
