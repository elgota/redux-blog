
import { useRouter } from "next/router";
import SinglePostPage from "@/app/pages/features/posts/SinglePostPage";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;

    return <SinglePostPage post={id}/>
};

export default Post;