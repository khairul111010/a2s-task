import { baseApi } from '.'

const paymentApi = baseApi
    .enhanceEndpoints({
        addTagTypes: ['Payment'],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            makePayment: builder.mutation<any, any>({
                query: (body) => ({
                    url: '/api/v1/payment/create-payment-intent',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Payment'],
            }),
            confirmPayment: builder.mutation<any, any>({
                query: (body) => ({
                    url: '/api/v1/payment/confirm-payment',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Payment'],
            }),
            getPaymentStatus: builder.query<any,void>({
                query: () => `/api/v1/payment/status`,
                providesTags: ['Payment'],
            })
            
        }),
    })

export const {
   useMakePaymentMutation,
   useGetPaymentStatusQuery,
   useConfirmPaymentMutation,
   useLazyGetPaymentStatusQuery
} = paymentApi

export default paymentApi
