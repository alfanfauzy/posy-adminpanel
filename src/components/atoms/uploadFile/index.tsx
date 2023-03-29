import React from 'react';

type AtomUploadFileProps = {
	labelText: string;
	name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AtomUploadFile = ({labelText, name}: AtomUploadFileProps) => (
	<div className="flex flex-col gap-4">
		{labelText && (
			<label className="mb-1 block text-m-regular">{labelText}</label>
		)}

		<input
			type="file"
			name={name}
			className="text-grey-500 text-sm
            file:mr-5 file:rounded-full file:border-0
            file:bg-blue-50 file:py-2
            file:px-6 file:text-sm
            file:font-medium file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
		/>
	</div>
);

export default AtomUploadFile;
