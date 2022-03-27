import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import CardsContainer from "./CardsContainer.js";
import SearchPosts from "./SearchPosts.js";
import SideNavBar from "@/components/layout/SideNavBar";
import AlertWrapper from "../../utils/AlertWrapper";
import style from "../../styles/Home.module.css";
import { Button } from "react-bootstrap";
import { Rings } from "react-loader-spinner";
import Sort from "./Sort";
import { useRouter } from "next/router";
import { useMainContext } from "@/components/context/MainContext";


// import { auth } from "../../config/fire-config";
// import { onAuthStateChanged } from "firebase/auth";

const PostsListContainer = () => {
  const [posts, setPosts] = useState(["Loading..."]);
  // const [currUser, setCurrUser] = useState([]);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [sortValue, setSortValue] = useState("postDate");
  const [sortType, setSortType] = useState("desc");
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const router = useRouter();
  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const { currentUser } = useMainContext();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) =>
  //     user ? setCurrUser(user) : setCurrUser("")
  //   );
  // }, []);

  const currentUserId = currentUser?.uid;

  const postNewItem = () => {
    currentUser
      ? router.push("/postItem")
      : router.push({
          pathname: "/signIn/SignIn",
          query: {
            routeTo: "/postItem",
          },
        });
  };

  return (
    <main>
      <div>
        <SearchPosts
          setPosts={setPosts}
          sortType={sortType}
          sortValue={sortValue}
        />
      </div>
      <>
        {showAlert ? (
          <AlertWrapper
            message={confirmationMessage}
            show={showAlert}
            handleClose={handleClose}
            bgColor="#008000"
          />
        ) : (
          ""
        )}
      </>
      <div className={style.mainContainer}>
        <div>
          <SideNavBar
            setPosts={setPosts}
            sortType={sortType}
            sortValue={sortValue}
            setDeleteBtnStatus={setDeleteBtnStatus}
            currentUserId={currentUserId}
          />
        </div>
        <div className={style.SortDiv}>
          <Sort setSortType={setSortType} setSortValue={setSortValue} />
          <div>
            <Button
              variant="warning"
              onClick={() => postNewItem()}
              style={{ backgroundColor: "#ffc107"}}
            >
              Add Post
            </Button>
          </div>
        </div>

        <div>
          <div className={style.PostsContainer}>
            {posts[0] === "Loading..." ? (
              <div className={style.mainScreenLoader}>
                <Rings color="#ef9d06" height={140} width={140} />
              </div>
            ) : posts.length <= 0 ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "17rem",
                  fontSize: "50px",
                }}
              >
                OOPS!
                <br />
                No results found
              </div>
            ) : (
              <CardsContainer
                posts={posts}
                deleteBtnStatus={deleteBtnStatus}
                handleClick={handleClick}
                setConfirmationMessage={setConfirmationMessage}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostsListContainer;
