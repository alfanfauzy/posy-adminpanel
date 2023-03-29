import {dateFormatter} from 'utils/dateFormatter';

describe('dateFormatter', () => {
	test('valid', () => {
		const test = dateFormatter(586853593);
		expect(test).toBe('06 August 1988');
	});

	test('valid data with date format', () => {
		const testWithDateFormat = dateFormatter(586853593, 'dd MMM yyyy');
		expect(testWithDateFormat).toBe('06 Aug 1988');
	});
});
