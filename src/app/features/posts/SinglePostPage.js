"use client"
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useRouter } from "next/navigation";
import Link from "next/link";



const SinglePostPage = ({ postId }) => { 
    //retrieve postId

    // const router = useRouter();
    // const { id: postId} = router.query;
    

    console.log("Post id flag: ", postId);


    const post = useSelector((state) => selectPostById(state, Number(postId)));
  
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    

  

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
            <Link href={`edit/${post.id}`}> Edit Post</Link> 
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />

            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage;


