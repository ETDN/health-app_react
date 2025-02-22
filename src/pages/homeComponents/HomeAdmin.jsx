import { useContext } from "react";
import { ThemeContext, themes } from "../../Context";
import { Link } from "react-router-dom";


/**
 * Display the Home of an Administrator
 * 
 */
export default function HomeAdmin() {
    let themeContext = useContext(ThemeContext);
  
    const openInNewTab = () => {
      window.open(
        "https://console.firebase.google.com/u/0/project/healthapp-23042/overview",
        "_blank",
        "noopener,noreferrer"
      );
    };
  
    return (
      <div
        className="container"
        style={{
          backgroundColor: themes[themeContext.theme].background,
          color: themes[themeContext.theme].foreground,
        }}
      >
        <h2
          className="center hi"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Welcome back Admin
        </h2>
        <Link to="/settings">
          <button
            className="btn"
            style={{
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}
          >
            Modifiy variables
          </button>
        </Link>
  
        <br />
        <br />
        {/* open Firebase link in new tab using a button */}
        <button
          className="btn"
          onClick={() => openInNewTab()}
          style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}
        >
          Firebase console
        </button>
  
        <br />
        <br />
        {/* Button to Add a New doctor */}
        <Link to="/registerDocteur">
          <button
            className="btn"
            style={{
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}
          >
            Add a doctor
          </button>
        </Link>
      </div>
    );
  }