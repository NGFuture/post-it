import NavBar from "./NavBar/NavBar";
import SideNavBar from "./NavBar/SideNavBar";
import "../styles/NavBar.module.css";

export default function mainLayout({ children }) {
  return (
    <main>
      <NavBar />
      <SideNavBar />
      {children}
    </main>
  );
}
