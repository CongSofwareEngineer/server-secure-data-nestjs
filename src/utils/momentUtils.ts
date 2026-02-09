import * as moment from 'moment'

export const formatDate = (value?: any, type = 'DD-MM-YYYY') => {
  if (!value) {
    return moment().format('DD-MM-YYYY')
  }
  return moment(value).format('DD-MM-YYYY')
}

export const plusDay = (value?: any, amount = 7, type: moment.DurationInputArg2 = 'days') => {
  return moment(value || moment()).add(amount, 'days')
}

export const dateToFixed = (value?: any) => {
  if (value) {
    return new Date(value).getTime().toFixed()
  }
  return new Date().getTime().toFixed()
}

export const convertDateToNumber = (date?: any): number => {
  try {
    return moment(date || Date.now()).valueOf()
  } catch (error) {
    return moment(Date.now()).valueOf()
  }
}
