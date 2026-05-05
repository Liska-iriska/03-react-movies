// import { useState } from "react";
// import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";

export default function App() {
  const handleSearch = (searchTerm: string) => {
    console.log("Шукаємо:", searchTerm);
  };
  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}
