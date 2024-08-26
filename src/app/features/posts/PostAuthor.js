import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import Link from "next/link";

const PostAuthor = ( { userId } ) => {
    const users = useSelector(selectAllUsers);

    const author = users.find(user => user.id === userId);

    return <span>by {author 
            ? <Link href={`/features/users/userpage/${userId}`}>{author.name}</Link>
            : "Unknown author"}
            </span>
}

export default PostAuthor;