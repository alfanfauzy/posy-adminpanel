import {DeleteRestaurantResponse} from '@/data/restaurant/types';
import {useDeleteRestaurantUsecase} from '@/data/restaurant/usecases/DeleteRestaurantUsecase';
import {DeleteRestaurantRepository} from '@/domain/restaurant/repositories/RestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteRestaurantViewModal = (
	options?: MutationOptions<DeleteRestaurantResponse>,
): DeleteRestaurantRepository => {
	const result = useDeleteRestaurantUsecase(options);

	return result;
};
