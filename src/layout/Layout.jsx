import { Outlet } from "react-router-dom";
import logo from "../assets/images/LogoCrediXpress.png";
import styles from "./Layout.module.css";
import { Footer } from "../components/footer/footer";
export const Layout = () => {
  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.containerImg}>
          <img src={logo} className={styles.logoImg} />
        </div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
