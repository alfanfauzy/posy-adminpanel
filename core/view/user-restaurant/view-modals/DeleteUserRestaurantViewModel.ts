import {DeleteUserRestaurantResponse} from '@/data/user-restaurant/types';
import {useDeleteUserRestaurantUsecase} from '@/data/user-restaurant/usecases/DeleteUserRestaurantUsecase';
import {DeleteUserRestaurantRepository} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteUserRestaurantViewModal = (
	options?: MutationOptions<DeleteUserRestaurantResponse>,
): DeleteUserRestaurantRepository => {
	const result = useDeleteUserRestaurantUsecase(options);

	return result;
};
