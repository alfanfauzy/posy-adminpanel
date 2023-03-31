import React, {CSSProperties} from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

type LoadingProps = {
	size: number;
};

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
};

export const Loading: React.FC<LoadingProps> = ({size}) => (
	<div className="flex h-screen items-center justify-center">
		<BeatLoader
			color="#36d7b7"
			size={size}
			cssOverride={override}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	</div>
);
