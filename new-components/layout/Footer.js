import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from './Footer.module.css'




function Footer() {
    const theme = useTheme();

    const date = new Date()
    const year = date.getFullYear()
  return (
    <footer className={styles.footer} style={{
      backgroundColor: theme.palette.primary.main,
    }}>
        <div> Copyright &copy; {year} | &nbsp;</div>
        <a  href="https://github.com/NGFuture/post-it/tree/DisplayPosts_2">GitHub</a>

    </footer>
  )
}

export default Footer