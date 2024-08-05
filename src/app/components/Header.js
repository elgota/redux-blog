import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCount } from "../features/posts/postsSlice";

const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getCount);

    return (
        <header className="Header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/post/add">Post</Link></li>
                    <li><Link href="/features/users/userlist">Users</Link></li>
                </ul>
                <button
                    onClick={() =>
                        dispatch(increaseCount())
                    }
                >
                {count}
                </button>
            </nav>
        </header>
    )
}

export default Header;