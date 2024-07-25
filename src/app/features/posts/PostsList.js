"use client"
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import { useEffect } from "react";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch]);

  /*   dispatch(fetchPosts()); */

    console.log("Posts data array flag ", posts);
    

   {/* const renderedPosts = orderedPosts.map(post => (
         <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />

        </article> 
    ))*/}

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        /* const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />) */
        content = posts.map((post, index) => (
            <article key={index}>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <div className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />

        </article>
        ))
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }


    return (

        <section>
            <h2>Posts</h2>
            {content}
        </section>
        
    );
};

export default PostsList;
