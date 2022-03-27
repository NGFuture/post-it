import React, { useState, useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from "./Title.module.css";
import { useMainContext } from "@/components/context/MainContext";
// import DeletePostDP from "./DeletePostDP";
// import EditPostDP from "./EditPostDP";


export default function Title({ post }) {
    const { currentUser, toggleFavorite, favorites, openLoginPopup } = useMainContext();
    const liked = favorites.includes(post.id)
    const handleLikeClick = () => {
        if (!currentUser) {
            openLoginPopup();
            return;
        }
        toggleFavorite(post)
        
    };
    return (
        <div className = {styles.titleWrapper}>
            <span className = {styles.heart} onClick={handleLikeClick}>
                {liked ? (
                        <FavoriteIcon color="action"/>
                ) : (
                        <FavoriteBorderIcon />
                    )}
            </span>
            <h1 className={styles.title}>{post.title} </h1>
            <p>
                {/* <DeletePostDP />
                <EditPostDP /> */}
            </p>
        </div>
    )
}