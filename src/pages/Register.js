import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { User } from "../objects/User";
import { CreateDocUser, CreateDocUserInResultat} from "../objects_managers/UserManager";
import "@fontsource/lexend-deca";
import "./pages.css";
import "../App.css";
import { Link } from "react-router-dom";
import docs from "./img/docs.jpg";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [generalEror, setGeneralError] = useState("");

  const handleRegister = async (e, email, password) => {
    // e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      let user = new User(auth.currentUser.uid, email, "", 0, 0, 0, 0);
      //To create the user document in Firestore with the id created by Auth
      await CreateDocUser(user);

      await CreateDocUserInResultat(user);
      navigate("/Registration");

    } catch (e) {
      setGeneralError(e.name);
      console.error(e);
    }
  };

  return (
    <>
      <div className="container left">
        <img className="docs_pics" src={docs} alt=''></img>
      </div>
      <div className="container right">
        <>
          <h2 className="page_name">Register</h2>
          <p className="click_here">
            Register yourself to keep track on your health{" "}
          </p>
          <RegisterForm handleSubmit={handleRegister} />
          {generalEror !== "" ? (
            <div className="error">{generalEror}</div>
          ) : null}
          <p className="click_here" style={{ fontSize: 14 }}>
            Already Have an Account ? <Link to="/Login">Go to Login</Link>{" "}
          </p>
        </>
      </div>
    </>
  );
}
