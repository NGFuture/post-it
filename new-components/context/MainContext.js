import { createContext, useContext } from "react";
// special object which has Provider property
const MainContext = createContext();

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const MainProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

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
            }  else {
                const currentUser = { 
                    accountCreatedDate: new Date(),
                    email: user.email,
                    name: user.displayName,
                    phoneNumber: user.phoneNumber,
                    photo: user.photoURL,
                    provider: `Login-${user.providerData[0].providerId}`,
                    savedPosts: [],
                    uid: user.uid,
                    zipCode: 0,}
                setCurrentUser(currentUser);
                await setDoc(doc(db, "users", user.uid), currentUser);
            }


        }
        authChange();

    }, [user])

    
                



    const value = {
        currentUser: currentUser,
        photo: photo
    };
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
};

export const useMainContext = () => useContext(MainContext);