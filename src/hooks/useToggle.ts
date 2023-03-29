import {useState} from 'react';

/**
 * @function useToggle
 *
 */
const useToggle = (initialValue: boolean) => {
	const [value, setValue] = useState(!!initialValue);

	const setTrue = () => setValue(true);

	const setFalse = () => setValue(false);

	const toggle = () => setValue(x => !x);

	return {value, setValue, setTrue, setFalse, toggle};
};

export default useToggle;
