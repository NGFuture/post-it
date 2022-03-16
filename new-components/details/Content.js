import React, { useState, useEffect } from "react";
import styles from "./Content.module.css";
import {
  doc,
  onSnapshot,
  collection,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { db, storage } from "../../config/fire-config";
import DaysAgo, { formatDay } from "../../utils/DaysAgo";
import ZipToCity from '../../utils/ZipToCity';
import NumberFormat from 'react-number-format';
import ShareBtn from "./ShareBtn"
import Button from '@mui/material/Button';



export default function Content({ post, openLoginPopup, currentUser }) {

  const [showContacts, setShowContacts] = useState(false);

  const handleContactClick = () => {
    if (!currentUser) {
      openLoginPopup();
      return;
    }
    setShowContacts(true);
  };

  const descrHTML = post.description;

  //adding tag <a> to the links in the string
  // to check regular expression go to https://regex101.com/
  function httpHtml(content) {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|\+|\%|\;)+)/g;
    return content.replace(reg, '<a style="text-decoration: underline; color: blue" href="$1$2" target="_blank">Link</a>');
  }
  const newDescrption = httpHtml(descrHTML)


  return (
    <>
      {(post.price === 0) ? (
        <h2>Free</h2>
      ) : (
          <h2>
            <NumberFormat value={post.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </h2>
        )}

      <p> Posted {formatDay(post.postDate.seconds)} in <ZipToCity zip={post.zip} /></p>

      <div className={styles.buttonsGroup}>
        <Button variant="contained" color="primary" onClick={handleContactClick} className={styles.contactBtn}>
          Contact seller
      </Button>
        <ShareBtn className={styles.shareBtn} />
      </div>
      {showContacts && (
        <p>
          {" "}
          {post.phone} <br /> {post.email}{" "}
        </p>
      )}
      <div className={styles.description}
        dangerouslySetInnerHTML={{ __html: newDescrption }}
      />

    </>
  );
}
