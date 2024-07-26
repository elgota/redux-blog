import SinglePostPage from "@/app/features/posts/SinglePostPage";

const Post = ({ params }) => {

  console.log("Dynamic route flag ", params)
  return (
    <div>
      <p>testing routing with page post number {params.id}</p>
    <SinglePostPage />
    </div>
    
  );
};

export default Post;
