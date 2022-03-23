import { useState, useEffect } from "react";
import { db, storage, auth } from "../../config/fire-config";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { PropTypes } from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
import style from "./ProfileImage.module.css";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { IconButton, Input, FormControl } from "@material-ui/core";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useMainContext } from "@/components/context/MainContext";
// import { onAuthStateChanged } from "firebase/auth";

const ProfileImage = ({ photo }) => {
  const { currentUser } = useMainContext();
  // const [currentUser, setCurrentUser] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [progress, setProgress] = useState("getUpload");
  const [showIcons, setShowIcons] = useState(false);

  // useEffect(async () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     } else {
  //       setCurrentUser("");
  //     }
  //   });
  // }, []);

  const handleImageUpload = (e) => {
    const userImage = e.target.files[0];
    const imageRef = ref(storage, `userProfileImages/${userImage.name}`);
    const uploadImages = uploadBytesResumable(imageRef, userImage);
    uploadImages.on(
      "state_changed",
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploading", process);
        setProgress("uploading");
      },
      (error) => {
        console.log("Encounter ", error);
      },
      () => {
        getDownloadURL(
          ref(storage, `userProfileImages/${userImage.name}`)
        ).then((url) => {
          setDisplayUrl(url);
          console.log(url);
          setProgress("uploaded");
          setShowIcons(true);
        });
      }
    );
  };
  const imageContent = () => {
    switch (progress) {
      case "getUpload":
        return <div>""</div>;
      case "uploading":
        return <div>{displayUrl ? displayImage(displayUrl) : ""}</div>;
      case "uploaded":
        return <div>{displayUrl ? displayImage(displayUrl) : ""}</div>;
      case "failedUpload":
        return <div> Upload failed </div>;
    }
  };

  const displayImage = (dUrl) => {
    return (
      <>
        {progress === "uploading" ? (
          <div>
            <TailSpin color="#ef9d06" height={40} width={40} />
          </div>
        ) : (
          <div className={style.userImgDiv}>
            <Image src={dUrl} alt={dUrl} className={style.userImage} />
            <div className={style.userImageBtn}>
              <RiCloseCircleFill
                style={{
                  fill: "#D50005",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={() => deleteImage(dUrl)}
              />

              <IoMdCheckmarkCircle
                style={{
                  fill: "#008000",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={(e) => handleSubmit()}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const deleteImage = (dUrl) => {
    setDisplayUrl("");
    const deleteRef = ref(storage, dUrl);
    deleteObject(deleteRef)
      .then(() => {
        setProgress("getUpload");
        setShowIcons(false);
      })
      .catch((error) => {
        console.error("error occurd: ", error);
      });
  };

  const handleSubmit = () => {
    const docRef = doc(db, "users", currentUser.uid);
    updateDoc(docRef, { photo: displayUrl })
      .then(() => {
        setDisplayUrl("");
        setShowIcons(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding Document: ", error);
      });
  };

  return (
    <div className={style.mainDiv}>
      {!showIcons ? (
        <img src={photo} className={style.DisplayImage} />
      ) : (
        <>{imageContent()}</>
      )}
      <FormControl
        onSubmit={() => handleSubmit()}
        className={style.DisplayBtnPhoto}
      >
        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleImageUpload(e);
            }}
          />
          <IconButton
            color="action"
            aria-label="upload picture"
            component="span"
            align="center"
            style={{
              display: showIcons ? "none" : "block",
            }}
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </FormControl>
    </div>
  );
};

ProfileImage.propTypes = {
  photo: PropTypes.string,
};

export default ProfileImage;
