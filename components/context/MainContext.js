import { createContext, useContext } from "react";
// special object which has Provider property
const MainContext = createContext();

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, onSnapshot, query, where, collection, documentId} from "firebase/firestore";
// import admin from "firebase-admin";
// import { FieldPath } from '@google-cloud/firestore'


export const MainProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [favList, setFavList] = useState([]);
    const [loginAlert, setLoginAlert] = useState(false);
    const router = useRouter();

    const openLoginPopup = () => {
        setLoginAlert(true);
        if (!router.query.routeTo) {
            router.push(router.asPath+`?routeTo=${router.asPath}`)
        }
    }


    const toggleFavorite = (post) => {
        const updateSavedPosts = (savedPosts) => {
            updateDoc(doc(db, "users", currentUser.uid), {
                savedPosts,
            });
            setCurrentUser({ ...currentUser, savedPosts });
        };
        const liked = currentUser.savedPosts.includes(post.id);
        if (liked) {
            //delete post form savedPost collection for current user
            const newSavedPosts = [...(currentUser.savedPosts || [])];
            const postIndex = newSavedPosts.findIndex((nextPost) => {
                return nextPost === post.id;
            });
            newSavedPosts.splice(postIndex, 1);
            updateSavedPosts(newSavedPosts);
        } else {
            const newSavedPosts = [...(currentUser.savedPosts || [])];
            newSavedPosts.push(post.id);
            // newSavedPosts.push({
            //     postId: post.id,
            //     postDate: post.postDate,
            //     imageUrls: post.imageUrls[0],
            //     price: post.price,
            //     title: post.title,
            //     zip: post.zip
            // });
            updateSavedPosts(newSavedPosts);
        }
    };

    const favoritesList = (userFavList) => {
        const postsRef = collection(db, "posts");
        const q = query(
            postsRef,
            where(documentId(), "in", userFavList.savedPosts)
        );
        onSnapshot(q, (snap) => {
            const queryList = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFavList(queryList);
        });

    };


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser(null);
            }
        });
    }, [])

    useEffect(() => {
        if (!user) return
        async function authChange() {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // if (docSnap.data().photo) {
                //     setPhoto(docSnap.data().photo);
                // } 
                setCurrentUser(docSnap.data())
            } else {
                const currentUser = {
                    accountCreatedDate: new Date(),
                    email: user.email,
                    name: user.displayName,
                    phoneNumber: user.phoneNumber,
                    photo: user.photoURL,
                    provider: `Login-${user.providerData[0].providerId}`,
                    savedPosts: [],
                    uid: user.uid,
                    zipCode: 0,
                }
                setCurrentUser(currentUser);
                await setDoc(doc(db, "users", user.uid), currentUser);
            }


        }
        authChange();

    }, [user])

    useEffect(() => {
        if (currentUser) {
            setLoginAlert(false) 
        }
    }, [currentUser]);


    const value = {
        currentUser: currentUser,
        photo: photo,
        toggleFavorite: toggleFavorite,
        favorites: currentUser ?.savedPosts || [],
        favoritesList: favoritesList,
        favList: favList,
        loginAlert: loginAlert,
        setLoginAlert,
        openLoginPopup,
    };
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
};

export const useMainContext = () => useContext(MainContext);