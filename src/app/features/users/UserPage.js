import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPost } from "./../posts/postsSlice";
import Link from "next/link";



const UserPage = () => {
  
//User Id

  const user = useSelector(state => selectUserById(state, Number(userId)));

  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter(post => post.userId === Number(userId))
  })

  const postTitles = postsForUser.map(post => (
    <li>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
        <h2>{user?.name}</h2>

        <ol>{postTitles}</ol>
    </section>
    
);
};

export default UserPage;
