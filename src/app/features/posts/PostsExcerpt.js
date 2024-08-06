import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import Link from "next/link";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  
  return (
    <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 75)}</p>
            <div className="postCredit">
            <Link href={`post/${post.id}`}> View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />

        </article>
  );
};

export default PostsExcerpt;
