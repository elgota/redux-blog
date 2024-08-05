"use client"

import { useSelector } from "react-redux";
import { selectAllUsers } from "./../usersSlice";
import Link from "next/link";

const UserList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map(user => (
    <li key={user.id}>
        <Link href={`/features/users/userpage/${user.id}`}>{user.name}</Link>
    </li>
  ));
  
  
    return (
        <section>
            <h2>Users</h2>

            <ul>{renderedUsers}</ul>
        </section>

);
};

export default UserList;
