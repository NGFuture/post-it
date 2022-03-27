import React from "react";
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import styles from "./ShareBtn.module.css";
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { withStyles} from "@material-ui/styles";

const CustomizedTooltip = withStyles({
    tooltip: {
      color: "white",
      backgroundColor: "#00243D"
    }
  })(Tooltip);



export default function ShareBtn() {

    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <CustomizedTooltip
                    placement="right"
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        
                        <div className={styles.tooltip}>
                        <a href="#" onClick={(e)=>{
                            e.preventDefault();
                            navigator.clipboard.writeText(location.href);
                            handleTooltipClose();
                        }}>Copy link</a>
                        </div>
                    }
                >
                    <Button className={styles.btn} variant="outlined" endIcon={<ShareIcon />} color="secondary" onClick={handleTooltipOpen}>
                        Share
                    </Button>
                </CustomizedTooltip>
            </div>
        </ClickAwayListener>


    )
}