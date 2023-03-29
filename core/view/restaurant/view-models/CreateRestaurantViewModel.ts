import {CreateRestaurantResponse} from '@/data/restaurant/types';
import {useCreateRestaurantUsecase} from '@/data/restaurant/usecases/CreateRestaurantUsecases';
import {CreateRestaurantRepository} from '@/domain/restaurant/repositories/RestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateRestaurantViewModal = (
	options: MutationOptions<CreateRestaurantResponse>,
): CreateRestaurantRepository => {
	const result = useCreateRestaurantUsecase(options);

	return result;
};
