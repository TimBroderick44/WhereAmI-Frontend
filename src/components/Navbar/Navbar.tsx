import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./NavBar.module.scss";

const NavBar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <nav className={style.nav}>
      <p className={style.name}> WAI Inc. </p>
      <div className={style.links}>
      <NavLink className={style.home} to="/">
        <h1> Home </h1>
      </NavLink>
      {isAuthenticated && role === "USER" && (
        <NavLink className={style.search} to="/search">
          <h1> Search </h1>
        </NavLink>
      )}
      {isAuthenticated && role === "ADMIN" && (
        <>
          <NavLink className={style.search} to="/search">
            <h1> Search </h1>
          </NavLink>
          <NavLink className={style.admin} to="/admin">
            <h1> Admin </h1>
          </NavLink>
        </>
      )}
      </div>
      {isAuthenticated && <button className={style.logout} onClick={logout}>Logout</button>}
    </nav>
  );
};

export default NavBar;
