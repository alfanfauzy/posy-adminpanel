import {CreateUserRestaurantResponse} from '@/data/user-restaurant/types';
import {useCreateUserRestaurantUsecase} from '@/data/user-restaurant/usecases/CreateUserRestaurantUsecase';
import {CreateUserRestaurantRepository} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateUserRestaurantViewModal = (
	options?: MutationOptions<CreateUserRestaurantResponse>,
): CreateUserRestaurantRepository => {
	const result = useCreateUserRestaurantUsecase(options);

	return result;
};
