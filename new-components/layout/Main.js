import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "./Main.module.css";
import { MainProvider } from "@/components/context/MainContext";

const MainLayout = ({ children }) => {
    return (
        <MainProvider>
            <div className={styles.wrapper}>
                <NavBar />
                <div className={styles.content}>
                    {children}
                </div>
                <Footer />
            </div>
        </MainProvider>
    )
}

export default MainLayout