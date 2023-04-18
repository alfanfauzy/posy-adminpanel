import {GetAccessListDataResponse} from '@/data/access/types';
import moment from 'moment';
import {ParamsObject} from 'shared/baseResponse';

/**
 * Function to generate unique id
 * @param length
 * @returns
 *
 * @example
 * generateUniqueId(5) //6NncA
 * generateUniqueId(10) //tADailWR2D
 * generateUniqueId(15) //cSQB2XPpZyHt8XF
 */
export const generateUniqueId = (length: number) => {
	let result = '';
	const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
	const charactersLength = characters.length;
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

/**
 * Function to convert a unixtime to a date time
 * @param timestamp
 * @param formatConvert
 * @returns
 *
 * @example
 * timestamp(1678690408, 'DD-MM-YYYY HH:mm') //13-03-2023 13:53
 * timestamp(1678689892, 'DD-MM-YYYY HH:mm') //13-03-2023 13:44
 */
export const timeStampConverter = (
	timestamp: number,
	formatConvert: string,
) => {
	const times = moment.unix(timestamp);
	return times.format(formatConvert);
};

/**
 * Function to find the index of the array element
 * @param dataArray
 * @param field
 * @returns {number}
 *
 */
export const findIndexArraySearch = (
	dataArray: Array<ParamsObject>,
	field: string,
) => {
	const index = dataArray.findIndex(array => array.field === field);

	return index;
};

/**
 * Function to convert a ammount of numbers to a Rupiah currency
 * @param ammount
 * @returns {string}
 *
 * @example
 * FormatToRupiah(1000) // Rp1.000
 * FormatToRupiah(10000) // Rp10.000
 */
export const FormatToRupiah = (ammount: number) =>
	new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(ammount);

/**
 * Function to convert value date to unix timestamp
 *
 * @param valueDate
 * @returns
 *
 * @example
 * TimeToUnix(21-03-2023) //1679356800
 * TimeToUnix(30-03-2023) //1680220800
 */
export const TimetoUnix = (valueDate: string | number | Date) => {
	const date = new Date(valueDate);

	return Math.floor(date.getTime() / 1000);
};

export const formatCurrencyTextInput = (value: string) =>
	value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

export const GroupingAccess = (DataAccesses: object): Array<string> => {
	const getKey = Object.assign(DataAccesses).map(
		(data: GetAccessListDataResponse) => data.key.split(':')[0],
	);
	return Array.from(new Set(getKey));
};
