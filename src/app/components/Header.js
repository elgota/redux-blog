"use client"

import Link from "next/link";

const Header = () => {
    return (
        <header className="Header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/post/add">Post</Link></li>
                    <li><Link href="/features/users/userlist">Users</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;