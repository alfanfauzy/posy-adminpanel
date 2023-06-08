import {MetadataTime} from '@/domain/vo/BaseMetadata';

export type GetBankListResponse = {
	uuid: string;
	bank_code: string;
	bank_name: string;
};

export type GetCheckBankResponse = {
	bank_name: string;
	account_number: string;
	account_name: string;
};

export type GetSaveBankAccountResponse = {
	metadata: MetadataTime;
};

export type GetLinkedBankAccountResponse = {
	restaurant_uuid: string;
	bank_name: string;
	bank_uuid: string;
	account_number: string;
	account_name: string;
	email_notify_withdrawal: string;
	bank_proof_url: string;
};
