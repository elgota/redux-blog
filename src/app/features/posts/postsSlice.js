import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => "/posts",
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: "Post", id }))
            ]
        }),
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                console.log(result)
                return [
                    ...result.ids.map(id => ({ type: "Post", id }))
                ]
            }   
        }),
        addNewPost: builder.mutation({
           query: initialPost => ({
                url: "/posts",
                method: "POST",
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
           }),
           invalidatesTags: [
                { type: "Post", id: "LIST"}
           ] 
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: "PUT",
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id}
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id}
            ]
        }),  
    })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery
} = extendedApiSlice

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
);


export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostsIds,
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);


// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

// export const selectPostById = (state, postId) =>
//     state.posts.posts.find(post => post.id === postId);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { increaseCount, reactionAdded } = postsSlice.actions

export default postsSlice.reducer