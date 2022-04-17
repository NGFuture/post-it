import style from "./NavBar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignoutModal from "../../pages/signIn/SignoutModal";
import { auth, db } from "../../config/fire-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Logo from "./Logo";
import Link from "next/link";
import { useMainContext } from "@/components/context/MainContext";


const NavBar = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);

  const router = useRouter();
  const routeQuery = router.asPath

  const { currentUser, setLoginAlert } = useMainContext();
  console.log(currentUser);


  const toggleSignOutModal = () => setSignoutModal(!signoutModal);
  const reload = () => window.location.reload();

  return (
    <nav className={style.NavContainer}>
      <div className={style.LogoDiv}>
        <Logo />
      </div>
      <div className={style.userIcon}>
        <p>
          Hi,
          {currentUser
            ? currentUser.name.split(" ")[0]
            : "there"}
          !
        </p>

        {loggedIn ? (
          photo ? (
            <img
              src={photo}
              style={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                marginBottom: "0",
              }}
            />
          ) : (
              <FaUserCircle
                style={{
                  width: "auto",
                  height: "50px",
                  fill: "#ef9d06",
                  marginBottom: "0",
                }}
              />
            )
        ) : (
            <FaUserCircle
              style={{
                width: "auto",
                height: "50px",
                marginBottom: "0",
                fill: "#afafaf",
              }}
            />
          )}
        <div className={style.ProfileDiv}>
          <ul className={style.ProfileUl}>
            <li
              className={style.SignIn}
              onClick={() => {
                // router.push({
                //     pathname: "/signIn/SignIn",
                //     query: {
                //       routeTo: routeQuery} ,
                //     })
                setLoginAlert(true);
                // const provider = new GoogleAuthProvider();
                // signInWithPopup(auth, provider)
              }}
              style={{
                display: currentUser ? "none" : "block",
                color: "#008000",
              }}
            >
              Sign In
            </li>
            <li
              onClick={
                toggleSignOutModal

              }
              style={{
                display: currentUser ? "block" : "none",
                color: "#D50005",
              }}
            >
              Sign Out
            </li>
            <li>
              {!!currentUser && <Link
                href={
                  currentUser
                    ? `/userProfilePage/${currentUser.uid}`
                    : {
                      pathname: "/signIn/SignIn",
                      query: {
                        routeBack: `/userProfilePage/`,
                      },
                    }
                }
              >
                <span>My Profile</span>
              </Link>}
            </li>
          </ul>
        </div>
      </div>

      <SignoutModal
        show={signoutModal}
        onHide={toggleSignOutModal}
        setLoggedIn={setLoggedIn}
        onExit={reload}
      />
    </nav>
  );
};

export default NavBar;
