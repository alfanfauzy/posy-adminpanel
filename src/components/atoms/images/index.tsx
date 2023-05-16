import React from 'react';

type AtomImagesProps = {
	width: number;
	height: number;
	url: string;
	alt: string;
};

const AtomImages = ({width, height, url, alt}: AtomImagesProps) => {
	if (url === '' || url.includes('localhost:12004')) {
		return (
			<img
				src="/no-image.png"
				width={width}
				height={height}
				className={`rounded-lg border border-gray-300 object-cover h-[${height}px] w-[${width}px]`}
				alt={alt}
			/>
		);
	}
	return (
		<img
			src={url}
			width={width}
			height={height}
			className={`rounded-lg border border-gray-300 object-contain h-[${height}px] w-[${width}px]`}
			alt={alt}
		/>
	);
};

export default AtomImages;
