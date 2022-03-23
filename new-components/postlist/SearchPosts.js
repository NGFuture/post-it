import { useEffect, useState } from "react";
import Style from "../../styles/NavBar.module.css";
import { BsSearch } from "react-icons/bs";
import { PropTypes } from "prop-types";
import { db } from "../../config/fire-config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
// import firebaseConfig from "../config/fire-config";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

const SearchPosts = ({ setPosts, sortType, sortValue }) => {
  const [searchedValue, setSearchedValue] = useState("");

  function handleSearch() {
    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy(sortValue, sortType));

    onSnapshot(q, (snap) => {
      const searchPosts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(
        searchPosts.filter((post) =>
          post.title.toLowerCase().includes(searchedValue)
        )
      );
    });
  }

  useEffect(() => {
    handleSearch();
  }, [sortType, sortValue, searchedValue]);

  const onkeypressed = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={Style.SearchContainer}>
      <button aria-label="search" className={Style.SearchButton}>
        <BsSearch />
      </button>
      <input
        type="search"
        placeholder="Search Here"
        className={Style.SearchBar}
        aria-label="Search"
        onChange={({ target }) => {
          setSearchedValue(target.value.toLowerCase());
        }}
        onKeyUp={onkeypressed}
      />
    </div>
  );
};

SearchPosts.propTypes = {
  setPosts: PropTypes.func,
  sortType: PropTypes.string,
  sortValue: PropTypes.string,
};

export default SearchPosts;
