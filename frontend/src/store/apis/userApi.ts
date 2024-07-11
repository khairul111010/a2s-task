import { PaginationParams, PaginationResponse } from '@/types/pagination'
import { User } from '@/types/user'
import { baseApi } from '.'
import officeApi from './officeApi'

const userApi = baseApi
    .enhanceEndpoints({
        addTagTypes: ['Employees', 'Education', 'Experience', 'Assign', 'Payscale'],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllUsers: builder.query<any, void>({
                query: () => `/users/all`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getUsers: builder.query<PaginationResponse<User>, PaginationParams>({
                query: (pagination) =>
                    `users?page=${pagination.page || 1}&limit=${pagination.limit || 10}&search=${pagination.search || ''}`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getTerminatedUsers: builder.query<PaginationResponse<User>, PaginationParams>({
                query: (pagination) =>
                    `users/terminated?page=${pagination.page || 1}&limit=${pagination.limit || 10}`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getUserSalaryHistory: builder.query<PaginationResponse<User>, PaginationParams>({
                query: (pagination) =>
                    `users/salary-history?page=${pagination.page || 1}&limit=${
                        pagination.limit || 10
                    }`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getUserSalaryHistoryById: builder.query<PaginationResponse<User>, PaginationParams>({
                query: (pagination) =>
                    `users/${pagination.uuid}/salary-history?page=${pagination.page || 1}&limit=${
                        pagination.limit || 10
                    }`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getUser: builder.query<any, any>({
                query: (id) => `users/${id}`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getTerminatedUser: builder.query<any, any>({
                query: (id) => `users/terminated/${id}`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getProfile: builder.query<any, any>({
                query: (id) => `users/my-info/${id}`,
                providesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            createUser: builder.mutation({
                query: (body) => ({
                    url: 'auth/register',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Employees'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            updateUser: builder.mutation({
                query: (body) => ({
                    url: `users/${body.uuid}`,
                    method: 'PATCH',
                    body: body.body,
                }),
                invalidatesTags: ['Employees'],
            }),
            createEducationQualification: builder.mutation({
                query: (body) => ({
                    url: 'users/educational-qualification',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Education'],
            }),
            updateEducationQualification: builder.mutation({
                query: (body) => ({
                    url: `users/educational-qualification/${body.uuid}`,
                    method: 'PATCH',
                    body: body.body,
                }),
                invalidatesTags: ['Education'],
            }),
            deleteEducationQualification: builder.mutation({
                query: (uuid) => ({
                    url: `users/educational-qualification/${uuid}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Education'],
            }),
            getEducationQualification: builder.query<any, any>({
                query: (id) => `users/educational-qualification-list/${id}`,
                providesTags: ['Education'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getPayscale: builder.query<PaginationResponse<any>, PaginationParams>({
                query: (pagination) =>
                    `users/pay-grade?page=${pagination.page || 1}&limit=${pagination.limit || 10}`,
                providesTags: ['Payscale'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getAllPayscale: builder.query<any, void>({
                query: () => `users/pay-grade/all`,
                providesTags: ['Payscale'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            createPayscale: builder.mutation({
                query: (body) => ({
                    url: 'users/pay-grade',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Payscale'],
            }),
            updatePayscale: builder.mutation({
                query: (body) => ({
                    url: `users/pay-grade/${body.uuid}`,
                    method: 'PATCH',
                    body: body.body,
                }),
                invalidatesTags: ['Payscale'],
            }),
            deletePayscale: builder.mutation({
                query: (uuid) => ({
                    url: `users/pay-grade/${uuid}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Payscale'],
            }),
            getOnePayscale: builder.query<any, any>({
                query: (id) => `users/pay-grade/${id}`,
                providesTags: ['Payscale'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            createExperience: builder.mutation({
                query: (body) => ({
                    url: 'users/experience',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Experience'],
            }),
            updateExperience: builder.mutation({
                query: (body) => ({
                    url: `users/experience/${body.uuid}`,
                    method: 'PATCH',
                    body: body.body,
                }),
                invalidatesTags: ['Experience'],
            }),
            deleteExperience: builder.mutation({
                query: (uuid) => ({
                    url: `users/experience/${uuid}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Experience'],
            }),
            deleteEmployee: builder.mutation({
                query: (body) => ({
                    url: `users/${body.uuid}`,
                    method: 'DELETE',
                    body: body.body,
                }),
                invalidatesTags: ['Employees'],
            }),
            getExperience: builder.query<any, any>({
                query: (id) => `users/experience-list/${id}`,
                providesTags: ['Experience'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            assignUser: builder.mutation({
                query: (body) => ({
                    url: 'users/assign-post',
                    method: 'POST',
                    body,
                }),
                async onQueryStarted(_, {dispatch, queryFulfilled}) {
                    await queryFulfilled

                    dispatch(
                        officeApi.util.invalidateTags([
                            'Department',
                            'Center',
                            'Office',
                            'Committee',
                            'Institute',
                        ])
                    )
                },
            }),
            getAssignUser: builder.query<any, any>({
                query: (id) => `users/assign-post/${id}`,
                providesTags: ['Assign'],
                transformResponse: (response: any) => {
                    return response.result
                },
                async onQueryStarted(_, {dispatch, queryFulfilled}) {
                    await queryFulfilled
                    dispatch(
                        officeApi.util.invalidateTags([
                            'Department',
                            'Center',
                            'Office',
                            'Committee',
                            'Institute',
                        ])
                    )
                },
            }),
            getUserPosts: builder.query<any, any>({
                query: (id) => `users/assign-post/user/${id}`,
                providesTags: ['Assign'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            updateAssignUser: builder.mutation({
                query: (body) => ({
                    url: `users/assign-post/${body.uuid}`,
                    method: 'PATCH',
                    body: body.body,
                }),
                async onQueryStarted(_, {dispatch, queryFulfilled}) {
                    await queryFulfilled

                    const _tags = {
                        ...officeApi.util.invalidateTags([
                            'Department',
                            'Center',
                            'Office',
                            'Committee',

                            'Institute',
                        ]),
                    }
                    dispatch({..._tags, payload: [..._tags.payload, 'Assign']})
                },
            }),
            deleteAssignUser: builder.mutation({
                query: (uuid) => ({
                    url: `users/assign-post/${uuid}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Assign'],
            }),
        }),
    })

export const {
    useDeleteAssignUserMutation,
    useUpdatePayscaleMutation,
    useGetOnePayscaleQuery,
    useDeletePayscaleMutation,
    useGetAllPayscaleQuery,
    useLazyGetPayscaleQuery,
    useGetPayscaleQuery,
    useCreatePayscaleMutation,
    useGetUserPostsQuery,
    useLazyGetUserPostsQuery,
    useUpdateAssignUserMutation,
    useGetAssignUserQuery,
    useAssignUserMutation,
    useGetAllUsersQuery,
    useDeleteExperienceMutation,
    useUpdateExperienceMutation,
    useGetExperienceQuery,
    useCreateExperienceMutation,
    useDeleteEducationQualificationMutation,
    useUpdateEducationQualificationMutation,
    useGetEducationQualificationQuery,
    useCreateEducationQualificationMutation,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useCreateUserMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useUpdateUserMutation,
    useDeleteEmployeeMutation,
    useLazyGetTerminatedUsersQuery,
    useGetProfileQuery,
    useLazyGetProfileQuery,
    useLazyGetUserSalaryHistoryQuery,
    useLazyGetUserSalaryHistoryByIdQuery,
    useGetTerminatedUserQuery,
} = userApi
