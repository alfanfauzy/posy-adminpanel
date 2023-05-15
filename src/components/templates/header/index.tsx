import {GenerateAvatar} from '@/constants/utils';
import {LogoutPayload} from '@/domain/auth/models';
import {useLogoutViewModal} from '@/view/auth/view-models/LogoutViewModel';
import {useRouter} from 'next/router';
import React from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import {toast} from 'react-toastify';
import {useAppSelector, useDispatchApp} from 'store/hooks';
import {onLogout} from 'store/slice/auth';

const TemplatesHeader = () => {
	const router = useRouter();
	const dispatch = useDispatchApp();

	const {user_info, token} = useAppSelector(state => state.auth.authData);

	console.log(user_info);

	const {email, fullname, user_uuid} = user_info;

	const payloadLogout: LogoutPayload = {
		user_uuid,
		token,
	};

	const logout = () => {
		dispatch(onLogout());
		router.push('/auth/login');
	};

	// const {logout} = useLogoutViewModal({
	// 	onSuccess: data => {
	// 		if (data.code === 0) {
	// 			dispatch(onLogout());
	// 			router.push('/auth/login');
	// 			toast.success('Success Logout');
	// 		}
	// 	},
	// });

	return (
		<header className="flex w-full items-center justify-end gap-2 bg-white p-2 drop-shadow-lg">
			<p className="text-s-regular">{email}</p>
			<div className="border-r-2 border-gray-300 px-1">
				<section className="w-50 flex items-center gap-2 rounded-full bg-[#01B89D] p-2 text-white">
					<p>{GenerateAvatar(fullname)}</p>
				</section>
			</div>
			<span
				tabIndex={0}
				role="button"
				className="flex items-center justify-center gap-1 rounded-lg border border-gray-200 bg-red-400 p-2 text-xs text-white hover:border-red-200 hover:bg-red-300 hover:text-white"
				onClick={() => logout()}
				onKeyDown={() => logout()}
			>
				<AiOutlineLogout /> Logout
			</span>
		</header>
	);
};

export default TemplatesHeader;
