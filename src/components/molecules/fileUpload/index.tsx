/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable react/display-name */
import {MAX_FILE_SIZE, VALID_IMAGES_TYPES} from '@/constants/index';
import React, {ChangeEvent, forwardRef, useEffect, useState} from 'react';
import {AiOutlineClose, AiOutlinePlus} from 'react-icons/ai';
import {toast} from 'react-toastify';

type MoleculesFileUploaderProps = {
	label: string;
	helperText: string | undefined;
	error: boolean;
	handleSetValue: (field: string, file: File) => void;
	handleClearFile: (field: any) => void;
	name: string;
	fileUrl: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const MoleculesFileUploader = forwardRef(
	(
		{
			label,
			helperText,
			value,
			name = '',
			handleSetValue,
			handleClearFile,
			error,
			fileUrl = '',
		}: MoleculesFileUploaderProps,
		ref: any,
	) => {
		const [file, setFile] = useState<File>();

		const handleChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {
			if (!event.target.files) return;

			const selectedFile = event.target.files[0];

			const fileType = selectedFile.type;

			if (selectedFile.size > MAX_FILE_SIZE) {
				toast.error('File size exceeds maximum file size');
				return;
			}

			if (!VALID_IMAGES_TYPES.includes(fileType)) {
				toast.error('Invalid file type');
				return;
			}

			setFile(selectedFile);
			handleSetValue(name, selectedFile);
		};

		const resetFile = () => {
			ref.current.value = '';
		};

		const removeImage = () => {
			setFile(undefined);
			resetFile();
			handleClearFile(name);
		};

		// useEffect(() => {
		//   setFile(fileUrl)
		// }, [fileUrl])

		// console.log(fileUrl)

		return (
			<div>
				<div className="flex flex-col justify-center gap-2">
					<h1 className="text-m-regular">{label}</h1>
					{file && (
						<div className="m-auto h-[250px] border p-2">
							<div className="relative">
								<button
									type="button"
									className="absolute right-0 cursor-pointer rounded-full border-2 border-red-300 bg-red-200 p-1 hover:text-red-600"
									onClick={removeImage}
								>
									<AiOutlineClose />
								</button>
								<img
									className="w-[200px]"
									alt="preview"
									src={URL.createObjectURL(file)}
								/>
							</div>
						</div>
					)}

					<input
						type="file"
						ref={ref}
						className="hidden"
						onChange={handleChangeInputFile}
						value={value}
						name={name}
					/>
					{helperText && (
						<p className={`text-sm ${error ? 'text-red-caution' : undefined}`}>
							{helperText}
						</p>
					)}
					<button
						onClick={event => {
							event.preventDefault();
							ref.current.click();
						}}
						onKeyDown={event => {
							event.preventDefault();
							ref.current.click();
						}}
						type="button"
						className="flex items-center justify-center gap-2 rounded-md border !bg-[#00ba9b] p-2 text-sm text-white hover:!bg-[#58dbc5]"
					>
						<AiOutlinePlus />
						Add Image
					</button>
				</div>
			</div>
		);
	},
);

export default MoleculesFileUploader;
