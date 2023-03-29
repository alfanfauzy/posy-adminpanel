import {UpdateRestaurantResponse} from '@/data/restaurant/types';
import {useUpdateRestaurantUsecase} from '@/data/restaurant/usecases/UpdateRestaurantUsecase';
import {UpdateRestaurantRepository} from '@/domain/restaurant/repositories/RestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateRestaurantViewModal = (
	options?: MutationOptions<UpdateRestaurantResponse>,
): UpdateRestaurantRepository => {
	const result = useUpdateRestaurantUsecase(options);

	return result;
};
