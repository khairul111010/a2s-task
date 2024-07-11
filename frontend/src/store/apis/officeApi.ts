import { OfficeTypes } from '@/enums/officeTypeEnums'
import { CENTER, COMMITTEE, Department, INSTITUTE, Office } from '@/types/office'
import { PaginationParams, PaginationResponse } from '@/types/pagination'
import { baseApi } from '.'

const officeApi = baseApi
    .enhanceEndpoints({
        addTagTypes: ['Office', 'Department', 'Center', 'Post', 'Institute', 'Committee'],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllOffices: builder.query<any, void>({
                query: () => `/offices/all?officeType=${OfficeTypes.OFFICE}`,
                providesTags: ['Office'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getOffices: builder.query<PaginationResponse<Office>, PaginationParams>({
                query: (pagination) =>
                    `offices?officeType=${OfficeTypes.OFFICE}&page=${pagination.page || 1}&limit=${
                        pagination.limit || 10
                    }&search=${pagination.search || ''}`,
                providesTags: ['Office'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getAllDepartments: builder.query<any, void>({
                query: () => `/offices/all?officeType=${OfficeTypes.DEPARTMENT}`,
                providesTags: ['Department'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getDepartments: builder.query<PaginationResponse<Office>, PaginationParams>({
                query: (pagination) =>
                    `offices?officeType=${OfficeTypes.DEPARTMENT}&page=${
                        pagination.page || 1
                    }&limit=${pagination.limit || 10}&search=${pagination.search || ''}`,
                providesTags: ['Department'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getAllCommittees: builder.query<any, void>({
                query: () => `/offices/all?officeType=${OfficeTypes.COMMITTEE}`,
                providesTags: ['Committee'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getCommittees: builder.query<PaginationResponse<Office>, PaginationParams>({
                query: (pagination) =>
                    `offices?officeType=${OfficeTypes.COMMITTEE}&page=${
                        pagination.page || 1
                    }&limit=${pagination.limit || 10}&search=${pagination.search || ''}`,
                providesTags: ['Committee'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getAllInstitutes: builder.query<any, void>({
                query: () => `/offices/all?officeType=${OfficeTypes.INSTITUTE}`,
                providesTags: ['Institute'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getInstitutes: builder.query<PaginationResponse<Office>, PaginationParams>({
                query: (pagination) =>
                    `offices?officeType=${OfficeTypes.INSTITUTE}&page=${
                        pagination.page || 1
                    }&limit=${pagination.limit || 10}&search=${pagination.search || ''}`,
                providesTags: ['Institute'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            addCommittee: builder.mutation<any, {name: string; officeType: string}>({
                query: (body) => ({
                    url: '/offices',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Committee'],
                transformResponse: (response: any) => response.result,
            }),
            addDepartment: builder.mutation<any, {name: string; officeType: string}>({
                query: (body) => ({
                    url: '/offices',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Department'],
                transformResponse: (response: any) => response.result,
            }),
            createCenter: builder.mutation<any, {name: string; officeType: string}>({
                query: (body) => ({
                    url: '/offices',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Center'],
                transformResponse: (response: any) => response.result,
            }),
            createInstitute: builder.mutation<any, {name: string; officeType: string}>({
                query: (body) => ({
                    url: '/offices',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Institute'],
                transformResponse: (response: any) => response.result,
            }),
            getAllCenters: builder.query<any, void>({
                query: () => `/offices/all?officeType=${OfficeTypes.CENTER}`,
                providesTags: ['Center'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getCenters: builder.query<PaginationResponse<Office>, PaginationParams>({
                query: (pagination) =>
                    `offices?officeType=${OfficeTypes.CENTER}&page=${pagination.page || 1}&limit=${
                        pagination.limit || 10
                    }&search=${pagination.search || ''}`,
                providesTags: ['Center'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            addOffice: builder.mutation<any, {name: string; officeType: string}>({
                query: (body) => ({
                    url: '/offices',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Office'],
                transformResponse: (response: any) => response.result,
            }),
            getOffice: builder.query<Office, any>({
                query: (id) => `offices/${id}`,
                providesTags: ['Center', 'Committee', 'Department', 'Institute', 'Office'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getDepartment: builder.query<Department, any>({
                query: (id) => `offices/${id}`,
                providesTags: ['Department'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getCenter: builder.query<CENTER, any>({
                query: (id) => `offices/${id}`,
                providesTags: ['Center'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getInstitute: builder.query<INSTITUTE, any>({
                query: (id) => `offices/${id}`,
                providesTags: ['Institute'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getCommittee: builder.query<COMMITTEE, any>({
                query: (id) => `offices/${id}`,
                providesTags: ['Committee'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            createOffice: builder.mutation({
                query: (body) => ({
                    url: 'offices',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Office'],
            }),
            updateOffice: builder.mutation({
                query: ({id, ...patch}) => ({
                    url: `offices/${id}`,
                    method: 'PATCH',
                    body: patch,
                }),
                invalidatesTags: ['Office', 'Department', 'Center', 'Committee', 'Institute'],
            }),
            deleteOffice: builder.mutation({
                query: (id) => ({
                    url: `offices/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Office', 'Department', 'Center', 'Committee', 'Institute'],
            }),
            swapPosition: builder.mutation({
                query: (body) => ({
                    url: 'offices/swap-order-position',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Department', 'Office', 'Center', 'Committee', 'Institute'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            createPost: builder.mutation({
                query: (body) => ({
                    url: 'posts',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: [
                    'Department',
                    'Center',
                    'Office',
                    'Post',
                    'Committee',
                    'Institute',
                ],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getPost: builder.query<any, any>({
                query: (id) => `posts/${id}`,
                providesTags: ['Post'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            getPostOffice: builder.query<any, any>({
                query: (id) => `posts/office/${id}`,
                providesTags: ['Post'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
            updatePost: builder.mutation({
                query: ({uuid, ...patch}) => ({
                    url: `posts/${uuid}`,
                    method: 'PATCH',
                    body: patch,
                }),
                invalidatesTags: ['Office', 'Department', 'Center', 'Committee', 'Institute', "Post"],
            }),
            deletePost: builder.mutation({
                query: (id) => ({
                    url: `posts/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Office', 'Department', 'Center', 'Committee', 'Institute', "Post"],
            }),
            getPosts: builder.query<any, void>({
                query: () => `posts`,
                providesTags: ['Post'],
                transformResponse: (response: any) => {
                    return response.result
                },
            }),
        }),
    })

export const {
    useLazyGetAllCentersQuery,
    useLazyGetAllCommitteesQuery,
    useLazyGetAllDepartmentsQuery,
    useLazyGetAllInstitutesQuery,
    useLazyGetAllOfficesQuery,
    useLazyGetPostOfficeQuery,
    useDeletePostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useAddCommitteeMutation,
    useCreateInstituteMutation,
    useLazyGetCommitteesQuery,
    useLazyGetCommitteeQuery,
    useGetCommitteeQuery,
    useLazyGetInstitutesQuery,
    useGetOfficesQuery,
    useLazyGetOfficesQuery,
    useLazyGetDepartmentsQuery,
    useGetDepartmentQuery,
    useLazyGetDepartmentQuery,
    useAddDepartmentMutation,
    useCreateCenterMutation,
    useLazyGetCentersQuery,
    useLazyGetCenterQuery,
    useGetCenterQuery,
    useGetInstituteQuery,
    useLazyGetInstituteQuery,
    useAddOfficeMutation,
    useGetOfficeQuery,
    useLazyGetOfficeQuery,
    useCreateOfficeMutation,
    useUpdateOfficeMutation,
    useDeleteOfficeMutation,
    useSwapPositionMutation,
    useCreatePostMutation,
    useGetPostsQuery,
} = officeApi

export default officeApi
