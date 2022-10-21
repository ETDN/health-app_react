import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { Link,useNavigate } from "react-router-dom";
import { User } from "../objects/User";
import { CreateDocUser, CreateDocUserInResultat} from "../objects_managers/UserManager";
import "@fontsource/lexend-deca";
import "./pages.css";
import "../App.css";
import docs from "./img/login2.png";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import { ThemeContext, themes } from "../Context";
import { useContext } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [generalEror, setGeneralError] = useState("");

  let themeContext = useContext(ThemeContext);

  const handleRegister = async (e, email, password) => {
    // e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      let user = new User(auth.currentUser.uid, email, "", 0, 0, 0, 0,null, false);
      //To create the user document in Firestore with the id created by Auth
      await CreateDocUser(user);

      await CreateDocUserInResultat(user);
      navigate("/");

    } catch (e) {
      setGeneralError(e.name);
      console.error(e);
    }
  };

  return (
    <>
      <div className="container right" style={{
      backgroundColor: themes[themeContext.theme].background,
      color: themes[themeContext.theme].foreground,
  }}>
          <h2 className="page_name" 
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Register</h2>
          <p className="click_here" 
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
            Register yourself to keep track on your health{" "}
          </p>
          <RegisterForm handleSubmit={handleRegister} />
          {generalEror !== "" ? (
            <div className="error">{generalEror}</div>
          ) : null}
          <p className="click_here" style={{ fontSize: 14, color: themes[themeContext.theme].textcolor }}>
            Already Have an Account ? <Link to="/Login">Go to Login</Link>{" "}
          </p>
          <img className="docs_pics" src={docs} style={{width:"200px", float:"right", marginTop:"-100px", position:"relative"}}></img>
      </div>
    </>
  );
}
