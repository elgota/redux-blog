import SinglePostPage from "@/app/features/posts/SinglePostPage";

const Post = ({ params }) => {

  console.log("Dynamic route flag ", params)

  const postId = params.postId;
  return (
    <div>
      <p>testing routing with page post number {params.id}</p>
   {/*  <SinglePostPage postId={postId}/> */}
    <SinglePostPage />
    </div>
    
  );
};

export default Post;
