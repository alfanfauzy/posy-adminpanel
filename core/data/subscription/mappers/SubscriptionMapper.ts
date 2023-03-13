import { GetSubscriptionListDataResponse } from '../types'
import { Subscriptions } from '@/domain/subscription/models'

export const mapToSubscriptionModel = (
  datas: GetSubscriptionListDataResponse[],
): Subscriptions =>
  datas.map((data) => ({
    uuid: data.uuid,
    name: data.subscription_name,
    period: data.period,
    price: data.price,
    seconds: data.metadata.created_at.seconds,
    description: data.description,
  }))
