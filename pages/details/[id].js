import MainLayout from "@/components/layout/MainLayout";
import DisplayPost from "@/components/details/DisplayPost.js";
import { useRouter } from "next/router";
import { doc, onSnapshot, collection, getDoc } from "firebase/firestore";
import { db, storage } from "../../config/fire-config";
import { useState, useEffect } from "react";

const DetailsPage = () => {
    const router = useRouter();
    const id = router && router.query.id;
    const [postToDisplay, setPosttoDisplay] = useState(null);

    useEffect(() => {
        if (!id) return false;
        const docRef = doc(db, "posts", id);
        return onSnapshot(docRef, (doc) => {
            const post = { ...doc.data(), id: doc.id };
            setPosttoDisplay(post);
        });
    }, [id]);



    return (
        // <MainLayout>
            <>
                {!!postToDisplay ? <DisplayPost post={postToDisplay} /> : "Loading..."}
            </>
        // </MainLayout>
    )
}

export default DetailsPage
