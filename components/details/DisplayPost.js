import React, { useState, useEffect } from "react";
import {useRouter} from "next/router";
import styles from "./DisplayPost.module.css";
import { useMainContext } from "@/components/context/MainContext";
import dynamic from 'next/dynamic'
const Map = dynamic(
    () => import('./Map'),
    { ssr: false }
)
import Content from "./Content";
import PhotoGallery from "./PhotoGallery";
import Title from "./Title";
import Popup from "@/components/popup/Popup";
import SignInPage from "../../pages/signIn/SignIn";
import {
    doc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { db, storage } from "../../config/fire-config";
import { auth } from "../../config/fire-config";


export default function DisplayPost({ post }) {
    const { loginAlert, setLoginAlert } = useMainContext();  

    return (
        <div className={styles.mainContainer}>
            

            <div className={styles.mainField}>
                <div className={styles.title}>
                    <Title post={post} />
                </div>
                <div className={styles.content}>
                    <Content post={post} />
                </div>
                <div className={styles.map}>
                    <Map zip={post.zip} title={post.title} price={post.price} />
                </div>
                <div className={styles.photoGallery}>
                    <PhotoGallery photos={post.imageUrls} />
                </div>
            </div>
        </div>
    )
}






