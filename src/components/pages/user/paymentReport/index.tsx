import InformationIcon from 'public/icon/information';
import React from 'react';

const PaymentReportLayout = () => {
	return (
		<>
			<div className="mt-4 w-auto justify-between gap-5 rounded-tr-md rounded-tl-md border border-gray-200 bg-white p-4">
				<h2 className="text-l-bold">Payment Report</h2>
			</div>
			<section className="flex items-center gap-1 rounded-br-md rounded-bl-md border p-4">
				<div className="text-secondary-main">
					<InformationIcon color="#654DE4" />
				</div>
				<p className="text-m-semibold">
					This report only shows the transaction for the last 7 days
				</p>
			</section>
		</>
	);
};

export default PaymentReportLayout;
