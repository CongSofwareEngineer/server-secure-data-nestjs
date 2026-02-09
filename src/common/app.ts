export const JWT_AUTH = {
  secret: process.env.SECRET_KEY_JWT,
  expiredAccess: '15min',
  expiredRefresh: '15day',
} as const

export const LIMIT_DATA = 20 as number

export const MATH_SORT = {
  asc: 'asc',
  desc: 'desc',
}

export enum FILTER_BILL {
  'All' = 'all',
  'Processing' = 'processing',
  'Delivering' = 'delivering',
  'DeliverySuccess' = 'deliverySuccess',
  'Canceled' = 'canceled',
  'DeliveryFail' = 'deliveryFail',
}

export enum TYPE_DATE_TIME {
  'Hour' = 'Hour',
  'Day' = 'Day',
  'Second' = 'Second',
  'Moth' = 'Moth',
  'Year' = 'Year',
}
