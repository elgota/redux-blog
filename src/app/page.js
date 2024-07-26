"use client"

// import "./globals.css";
// import { store } from "./store";
// import { Provider } from "react-redux";
import Counter from "./features/counter/Counter";
import  PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import { fetchUsers } from "./features/users/usersSlice";
import SinglePostPage from "./features/posts/SinglePostPage";

// store.dispatch(fetchUsers());

export default function Home() {
  return (
    <>
    {/* <Provider store={store}> */}
      {/* <Counter/> */}
       <AddPostForm/>
      <PostsList/>

     
    {/* </Provider> */}
    </>
  );
}
