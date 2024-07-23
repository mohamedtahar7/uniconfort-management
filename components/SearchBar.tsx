"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import { QueryContext } from "@/contexts/QueryContext";
const SearchBar = () => {
  const { query, setQuery } = useContext(QueryContext);
  const [search, setSearch] = useState("");
  const handleSubmit = (word: any) => {
    setQuery(word);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(search);
      }}
      className="my-5 relative"
    >
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Rechercher par Nom"
      />
      <button type="submit" className="transition hover:opacity-80">
        <IoIosSearch
          size={30}
          className="absolute top-1 right-2 text-slate-800"
        />
      </button>
    </form>
  );
};

export default SearchBar;
