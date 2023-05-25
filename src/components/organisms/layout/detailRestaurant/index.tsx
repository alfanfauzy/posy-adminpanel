import AtomImages from '@/atoms/images';
import {useAccessControl} from '@/hooks/useAccessControl';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React from 'react';
import {AiOutlineDoubleLeft} from 'react-icons/ai';
import {useAppSelector} from 'store/hooks';

const OrganismDetailRestaurant = () => {
	const {hasAccess} = useAccessControl();
	const router = useRouter();
	const restaurant = useAppSelector(state => state.restaurant);

	return (
		<section className="flex h-auto w-auto gap-5 rounded-md border border-gray-200 bg-white p-7 shadow-md">
			<AtomImages
				url={restaurant.logo}
				width={200}
				height={200}
				alt="restaurant-logo"
			/>

			<div className="flex w-full flex-col gap-5">
				{/** ---- Title Section ----- */}
				<div className="flex justify-between">
					<h1 className="text-xl-semibold">{restaurant.name}</h1>
					<button
						type="button"
						onClick={() => router.push('/user/restaurant')}
						className="flex w-auto items-center gap-1 rounded-md border border-gray-200 !bg-[#00ba9a]  px-4 py-1 text-m-medium text-white shadow-md hover:!bg-[#219a86]"
					>
						<AiOutlineDoubleLeft />
						Back
					</button>
				</div>

				{/** --- Detail Section ----- */}
				<div className="flex justify-between">
					<div className="flex flex-col gap-3">
						<div>
							<h3 className="text-s-regular text-gray-400">Restaurant Email</h3>
							<p className="text-l-reguler">{restaurant.email}</p>
						</div>
						<div>
							<h3 className="text-s-regular text-gray-400">PIC Name</h3>
							<p className="text-l-reguler">{restaurant.pic_name}</p>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<div>
							<h3 className="text-s-regular text-gray-400">Restaurant Phone</h3>
							<p className="text-l-reguler">{restaurant.phone}</p>
						</div>
						<div>
							<h3 className="text-s-regular text-gray-400">PIC Phone</h3>
							<p className="text-l-reguler">{restaurant.pic_phone}</p>
						</div>
					</div>
					{hasAccess('restaurant:read_npwp') && (
						<div className="flex flex-col gap-3">
							<div>
								<h3 className="text-s-regular text-gray-400">NPWP</h3>
								<AtomImages
									url={restaurant.npwp}
									width={150}
									height={150}
									alt="npwp"
								/>
							</div>
						</div>
					)}
					{hasAccess('restaurant:read_nib') && (
						<div className="flex flex-col gap-3">
							<div>
								<h3 className="text-s-regular text-gray-400">NIB</h3>
								<AtomImages
									url={restaurant.nib}
									width={150}
									height={150}
									alt="nib"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default OrganismDetailRestaurant;
