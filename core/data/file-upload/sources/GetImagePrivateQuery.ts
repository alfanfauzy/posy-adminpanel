import axios, {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';
import {store} from 'store/index';

export const GetImagePrivateQuery = async (
	imageURL: string,
): Promise<string> => {
	try {
		const {token} = store.getState().auth.authData;

		const response = await axios.get(
			`/api/fnb-document-service/v1/document/private/image/${imageURL}`,
			{
				headers: {
					token,
				},
				responseType: 'arraybuffer',
			},
		);

		const bytes = new Uint8Array(response.data).reduce(
			(data: string, byte: number) => data + String.fromCharCode(byte),
			'',
		);
		const buffer = Buffer.from(bytes, 'binary').toString('base64');
		const image = `data:${response.headers['content-type']};base64,${buffer}`;
		return image;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetImagePrivateQuery = (
	imageURL: string,
	options?: UseQueryOptions<string>,
) =>
	useQuery<string>(
		['image/private', JSON.stringify(imageURL)],
		() => GetImagePrivateQuery(imageURL),
		{
			...options,
		},
	);
