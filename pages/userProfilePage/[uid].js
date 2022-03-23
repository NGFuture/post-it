import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../config/fire-config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import style from "../../styles/UserProfile.module.css";
import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import PasswordIcon from "@mui/icons-material/Password";
import { useRouter } from "next/router";
// import { onAuthStateChanged } from "firebase/auth";
import ProfileImage from "@/components/UserProfilePage/ProfileImage";
import { useMainContext } from "@/components/context/MainContext";

function UserProfile() {
  const router = useRouter();
  const uid = router && router.query.uid;
  const { currentUser } = useMainContext();


  useEffect(()=>{
    if (currentUser === null || currentUser.uid !== uid) {
      router.push("/")
    }
  },[])


  
  // const [user, setUser] = useState("");
  const [postCount, setPostCount] = useState([]);

  useEffect(async () => {
    if (!uid) return false;
    let q;
    const postsRef = collection(db, "posts");
    // const docRef = doc(db, "users", uid);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   const userData = { ...docSnap.data(), id: docSnap.id };
    //   setUser(userData);
    // }

    q = query(postsRef, where("userId", "==", uid));
    onSnapshot(q, (snap) => {
      const queryList = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostCount(queryList);
    });
  }, [uid]);

  useEffect(() => {
    if (currentUser === null) (router.push("/"))
  }, [currentUser]);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => (user ? "" : router.push("/")));
  // });
  if (!currentUser) {return "Loading..."}
  return (
    <div className={style.UserProfileContainer}>
      <main className={style.UPmainParent}>
        <div className={style.DataBoxChild}>
          <>
            <ProfileImage photo={currentUser.photo} />
          </>
          <>
            <div className={style.DisplayCard}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        colSpan={2}
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          fontWeight="bold"
                          fontSize="25px"
                          align="center"
                        >
                          {currentUser.name}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        colSpan={2}
                        component="th"
                        scope="row"
                        align="center"
                        sx={{
                          borderBottom: "none",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          padding: "0px",
                        }}
                      >
                        <Typography variant="body1" gutterBottom>
                          {currentUser.email}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {currentUser.provider === "Post-It Signup" ? (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          align="center"
                          sx={{ borderBottom: "none" }}
                        >
                          <Button
                            variant="outlined"
                            color="action"
                            startIcon={<PasswordIcon />}
                            size="small"
                            onClick={() => {
                              router.push("/signIn/changePassword");
                            }}
                          >
                            <Typography
                              sx={{ cursor: "pointer" }}
                              variant="body2"
                            >
                              Change Password
                            </Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="body1" gutterBottom>
                          Saved Post : {currentUser.savedPosts?.length}
                        </Typography>
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="body1" gutterBottom>
                          My Posts : {postCount.length}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        colSpan={2}
                        align="center"
                        sx={{ borderBottom: "none", padding: "0px" }}
                      >
                        <Typography variant="body1" gutterBottom>
                          Account since :{" "}
                          {currentUser.accountCreatedDate
                            ?.toDate()
                            .toLocaleDateString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        </div>
      </main>
    </div>
  );
}
export default UserProfile;
