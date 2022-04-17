import React, { useState } from "react";
import styles from "./Popup.module.css";

export default function Popup({close, children}) {

    return (
        <div className = {styles.overlay}>
            <div className = {styles.popup}>
                <div className = {styles.content}> {children} </div>
                <div className = {styles.close} onClick={close}>X</div>
            </div>
        </div>
    )
}