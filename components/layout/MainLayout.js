import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "./Main.module.css";
import { MainProvider, useMainContext } from "@/components/context/MainContext";
import Popup from "@/components/popup/Popup";
import SignInPage from "pages/signIn/SignIn";

const MainContentWrapper = ({ children }) => {
    const { loginAlert, setLoginAlert } = useMainContext();
    return (
        <>
            {loginAlert && (
                <Popup
                    close={() => {
                        setLoginAlert(false);
                    }}
                >
                    <SignInPage />
                </Popup>
            )}
            {children}
        </>
    )
};

const MainLayout = ({ children }) => {
    return (
        <MainProvider>
            <div className={styles.wrapper}>
                <NavBar />
                <div className={styles.content}>
                    <MainContentWrapper>
                    {children}
                    </MainContentWrapper>
                </div>
                <Footer />
            </div>
        </MainProvider>
    )
}

export default MainLayout