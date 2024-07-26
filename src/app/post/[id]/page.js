import SinglePostPage from "@/app/features/posts/SinglePostPage";

const Post = ({ params }) => {

  console.log("Dynamic route flag ", params)

  const { id: postId } = params;
  return (
    <div>
    <SinglePostPage postId={postId}/>
    </div>
    
  );
};

export default Post;
