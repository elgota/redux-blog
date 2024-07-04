"use client"

import "./globals.css";
import { store } from "./store";
import { Provider } from "react-redux";
import Counter from "./features/counter/Counter";

export default function Home() {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  );
}
