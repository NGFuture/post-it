import React, { useEffect } from "react";
import { useMainContext } from "@/components/context/MainContext";

export default function FavoritesList() {
    const { currentUser, favoritesList, favList } = useMainContext();
    useEffect(()=>{
        if (!currentUser) {return}
        favoritesList(currentUser)
    },[currentUser]);

    console.log(favList)
    return (
        <div>
            <ul>
                {
                    
                    favList.map(item => {
                        return (
                            <div key={item.postId}>{item.title}</div>
                    )})}
            </ul>
        </div>
    )
}