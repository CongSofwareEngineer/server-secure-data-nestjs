import fetcher, { IFetch, ReturnData } from '../fetcher'

class BaseAPI {
  static baseUrl: string = process.env.NEXT_PUBLIC_API_URI || ''
  static get headers() {
    return {}
  }

  static async get<T = any>(options: IFetch): Promise<ReturnData<T>> {
    return this.request({
      method: 'GET',
      ...options,
    })
  }

  static async post<T = any>(options: IFetch): Promise<ReturnData<T>> {
    return this.request({
      method: 'POST',
      ...options,
    })
  }

  static async put<T = any>(options: IFetch): Promise<ReturnData<T>> {
    return this.request({
      method: 'PUT',
      ...options,
    })
  }

  static async delete<T = any>(options: IFetch): Promise<ReturnData<T>> {
    return this.request({
      method: 'DELETE',
      ...options,
    })
  }

  static async request<T = any>(options: IFetch): Promise<ReturnData<T>> {
    return fetcher({
      baseUrl: this.baseUrl,
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    })
  }
}

export default BaseAPI
