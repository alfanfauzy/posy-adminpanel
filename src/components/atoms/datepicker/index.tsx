import {DatePicker, DatePickerProps} from 'antd';
import React from 'react';

type AtomDatePickerProps = {
	type: 'single' | 'range';
	onChange: (...event: Array<any>) => void;
	value: any;
	label?: string;
	className: string;
	placeholder: string;
	format: string;
	name: string;
} & DatePickerProps;

type RenderComponentProps = {
	type: 'single' | 'range';
	onChange: (...event: Array<any>) => void;
	value: any;
	className: string;
	placeholder: string;
	format: string;
	name: string;
} & DatePickerProps;

const RenderComponent = ({
	type,
	onChange,
	value,
	className,
	placeholder,
	format,
	name,
	...rest
}: RenderComponentProps) => {
	const {RangePicker} = DatePicker;
	if (type === 'single') {
		return (
			<DatePicker
				name={name}
				onChange={onChange}
				value={value}
				className={className}
				placeholder={placeholder}
				placement="bottomLeft"
				format={format}
				{...rest}
			/>
		);
	}
	return (
		<RangePicker
			onChange={onChange}
			value={value}
			className={className}
			placement="bottomLeft"
			format={format}
		/>
	);
};

const AtomDatePicker = ({
	type,
	onChange,
	value,
	label,
	className,
	placeholder,
	format,
	name,
	...props
}: AtomDatePickerProps) => (
	<div>
		{label && <label className="mb-1 block text-m-regular">{label}</label>}

		<RenderComponent
			name={name}
			type={type}
			onChange={onChange}
			value={value}
			className={className}
			placeholder={placeholder}
			format={format}
			{...props}
		/>
	</div>
);

export default AtomDatePicker;
