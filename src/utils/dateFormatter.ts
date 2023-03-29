import {format} from 'date-fns';

type DateFormatType =
	| 'dd LLL yyyy HH:mm:ss'
	| 'E, dd MMM yyyy - HH:mm'
	| 'dd MMM yyyy - HH:mm'
	| 'E, dd MMM yyyy'
	| 'MMMM yyyy'
	| 'yyyy-MM'
	| 'yyyy-MM-dd'
	| 'dd MMM yyyy'
	| 'E'
	| 'dd'
	| 'MM'
	| 'HH:mm'
	| 'EEE, dd MMM yyyy'
	| 'EEE, c LLLL yyyy';

export const dateFormatter = (
	timestamp: number,
	dateFormat?: DateFormatType,
): string => format(new Date(timestamp * 1000), dateFormat || 'dd MMMM yyyy');
