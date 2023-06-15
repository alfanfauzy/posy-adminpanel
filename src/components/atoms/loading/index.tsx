import React, {CSSProperties} from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

type LoadingProps = {
	size: number;
	height?: 'full' | 'unset';
};

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
};

export const Loading: React.FC<LoadingProps> = ({size, height = 'full'}) => {
	const styleHeight = height === 'full' ? 'h-screen' : '';

	return (
		<div className={`flex ${styleHeight} items-center justify-center p-4`}>
			<BeatLoader
				color="#36d7b7"
				size={size}
				cssOverride={override}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};
