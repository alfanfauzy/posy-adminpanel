import {UpdateUserRestaurantResponse} from '@/data/user-restaurant/types';
import {useUpdateUserRestaurantUsecase} from '@/data/user-restaurant/usecases/UpdateUserRestaurantUsecase';
import {UpdateUserRestaurantRepository} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateUserRestaurantViewModal = (
	options?: MutationOptions<UpdateUserRestaurantResponse>,
): UpdateUserRestaurantRepository => {
	const result = useUpdateUserRestaurantUsecase(options);

	return result;
};
