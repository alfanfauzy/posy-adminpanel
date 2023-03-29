import React from 'react';

const AtomTag = ({status = 'status'}: {status: string}) => (
	<span className="min-w-fit rounded-md border border-blue-300 bg-blue-400 p-1 text-white ">
		{status}
	</span>
);

export default AtomTag;
