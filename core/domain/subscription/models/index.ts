export interface SubscriptionBased {
  uuid: string
  name: string
  period: number
  price: number
  description: string
  seconds: number
}

export type Subscription = SubscriptionBased

export type Subscriptions = SubscriptionBased[]

export type FormSubscription = {
  subscription_name: string
  period: number
  price: number
  description: string
}
