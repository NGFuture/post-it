import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import PostsListContainer from "../components/PostsListContainer";
import PostsListContainer from "@/components/postlist/PostsListContainer";


const Home = () => {
  return (
    <div>
      <PostsListContainer />
    </div>
  );
};
export default Home;
