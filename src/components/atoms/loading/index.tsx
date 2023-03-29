import React from 'react';

type LoadingProps = {
	size: number;
};

export const Loading: React.FC<LoadingProps> = ({size}) => (
	<div className="flex-center h-10 w-[50%]">
		<div
			style={{width: `${size}px`, height: `${size}px`}}
			className="animate-spin"
		>
			<div
				className="h-full w-full rounded-[50%] border-4
       border-t-purple-500 border-b-purple-700"
			/>
		</div>
	</div>
);
