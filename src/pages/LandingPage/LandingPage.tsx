import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import style from "./LandingPage.module.scss";
import { DecodedToken } from "../../types";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Flexbox from "../../containers/Flexbox/Flexbox";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const authResponse = await authService.login({ username, password });
      login(authResponse.jwt);
      const decodedToken: DecodedToken = jwtDecode(authResponse.jwt);
      console.log(decodedToken);
      if (decodedToken.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/search");
      }
    } catch (error) {
      toast.error("Did somebody forget their login?");
    }
  };

  return (
    <Flexbox flexdirection="row" justifycontent="space-around">
      <div className={style.left}>
        <h1 className={style.title}><span>So...</span>Where Am I?</h1>
        <p className={style.description}>
          Are you lost? Know a suburb but not the postcode? Or maybe you know the postcode but not the suburb?
          <br />
          <br />
          We've all been there.. and we hear you! 
          <br />
          <br />
          It's time for people to stand up to Australia Post and challenge their monopoly on postcode data!
        </p>
        <p className={style.joke}> Why use <a href="https://auspost.com.au/postcode" target="_blank" rel="noreferrer" className={style.link}>
          a comprehensive database of Australian suburbs
        </a> when you can use this?!</p>
        <img src="confused.png" alt="confused" className={style.confused} />
      </div>
      <div className={style.right}>
      <p className={style.loginRequest}> Login and get started:</p>
        <form className={style.form} onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </Flexbox>
  );
};

export default LandingPage;
