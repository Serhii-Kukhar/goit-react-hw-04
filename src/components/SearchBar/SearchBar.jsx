import { useState } from "react";
import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ handleChangeQuery }) => {
  const [query, setQuery] = useState("");
  const notify = () =>
    toast("Поле неможе бути пустим!", {
      icon: "⚠️",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      },
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      notify();
      return;
    }

    handleChangeQuery(trimmedQuery);
    setQuery("");
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder=" 🔍 Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
