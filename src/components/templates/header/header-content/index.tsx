import {Button} from 'posy-fnb-core';
import React, {ReactNode} from 'react';

type HeaderContentProps = {
	onClick: () => void;
	textButton: string;
	withIconButton?: boolean;
	iconElement?: ReactNode | JSX.Element;
	flexEnd?: boolean;
};

const HeaderContent = ({
	onClick,
	textButton,
	withIconButton = true,
	iconElement,
	flexEnd = false,
}: HeaderContentProps) => (
	<header className={`mb-5 flex ${flexEnd ? 'justify-end' : 'justify-start'}`}>
		<Button
			type="submit"
			variant="primary"
			size="l"
			className="justify flex items-center  
      gap-2 text-sm"
			onClick={onClick}
		>
			{withIconButton && iconElement}
			{textButton}
		</Button>
	</header>
);

export default HeaderContent;
