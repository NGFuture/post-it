import React from 'react';
import { useTheme } from '@mui/material/styles';
// import style from '../styles/Home.module.css'
const style = {}



function Footer() {
    const theme = useTheme();

    const date = new Date()
    const year = date.getFullYear()
  return (
    <footer className={style.footer} style={{
      backgroundColor: theme.palette.primary.main,
    }}>
        <div className={style.footerDiv}> Copyright &copy; {year} </div>

    </footer>
  )
}

export default Footer