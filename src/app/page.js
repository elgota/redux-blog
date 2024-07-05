"use client"

import "./globals.css";
import { store } from "./store";
import { Provider } from "react-redux";
import Counter from "./features/counter/Counter";
import  PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
export default function Home() {
  return (
    <Provider store={store}>
      {/* <Counter/> */}
      <PostsList/>
      <AddPostForm/>
    </Provider>
  );
}
