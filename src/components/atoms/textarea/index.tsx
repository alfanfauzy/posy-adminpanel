import clsx from 'clsx';
import React, {TextareaHTMLAttributes} from 'react';

type AtomTextAreaProps = {
	name: string;
	labelText: string;
	placeholder: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const AtomTextArea = ({
	labelText,
	name,
	placeholder,
	...props
}: AtomTextAreaProps) => (
	<div>
		{labelText && (
			<label className="mb-1 block text-m-regular">{labelText}</label>
		)}
		<textarea
			{...props}
			className={clsx(
				'flex h-20 w-full items-center justify-center rounded-md border border-neutral-50 p-3 text-l-regular transition duration-300 ease-in-out',
				'hover:border-neutral-100',
				'focus:outline-1 focus:outline-neutral-100',
				'active:shadow-md',
			)}
			name={name}
			placeholder={placeholder}
		/>
	</div>
);

export default AtomTextArea;
