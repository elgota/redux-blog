"use client"

import { useSelector } from "react-redux";
import { selectPostsIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    const orderedPostsIds = useSelector(selectPostsIds);

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = orderedPostsIds.map(postId => <PostsExcerpt key={postId} postId={postId}/>)
    } else if (isError) {
        content = <p>{error}</p>;
    }


    return (

        <section>
            {content}
        </section>

    );
};

export default PostsList;
