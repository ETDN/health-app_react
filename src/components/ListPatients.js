import { useEffect, useState, useContext } from "react";
import { GetUserById } from "../objects_managers/UserManager";
import { ThemeContext, themes } from "../Context";
import { DealWithPatientRequest } from "../objects_managers/DocteurManager";
import { BouncingDotsLoader } from "../utils/tools";

export function ListPatient(props) {
  const [patients, setPatients] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [requestPatients, setRequestPatients] = useState([]);
  const [isBusy2, setBusy2] = useState(true);

  useEffect(() => {
    const fetchUser = async (id) => {
      const result = await GetUserById(id);
      console.log("User retrived :", result);
      setPatients((prevUsers) => [...prevUsers, result]);
    };

    if (props.currentUser.list_patient.lenght !== 0) {
      props.currentUser.list_patient.forEach((project) => {
        fetchUser(project);
      });
      setBusy(false);
    }
  }, [props.currentUser.list_patient]);

  useEffect(() => {
    const fetchUser = async (id) => {
      const result = await GetUserById(id);
      setRequestPatients((prevUsers) => [...prevUsers, result]);
    };

    if (props.currentUser.list_request_patient.lenght !== 0) {
      props.currentUser.list_request_patient.forEach((project) => {
        fetchUser(project);
      });
    }
    setBusy2(false);
  }, [props.currentUser.list_request_patient]);

  return (
    <>
      {isBusy && isBusy2 ? (
        <BouncingDotsLoader />
      ) : (
        <div className="container_list_patient">
          <div className="box_list">
            <h3> Patients that asked us to be our doctor </h3>
            <p>you can accepte them or refuse them</p>

            {requestPatients.length > 0 ? (
              <UserList
                currentUser={props.currentUser}
                patients={requestPatients}
                isRequest={true}
              />
            ) : (
              <p style={{ color: "#00A36C", fontStyle: 'italic'  }}>no request pending</p>
            )}
          </div>
          <hr />
          <div className="box_list">
            <h3> List of Patients</h3>
            {patients.length > 0 ? (
              <UserList
                currentUser={props.currentUser}
                patients={patients}
                isRequest={false}
                setShowHistoric={props.setShowHistoric}
                setPatientToShow={props.setPatientToShow}
              />
            ) : (
              <p style={{ color: "#00A36C", fontStyle: 'italic' }}>No patients for the moment</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function UserList(props) {
  let themeContext = useContext(ThemeContext);

  const HandleClick = async (event, res) => {
    if (event.target.name === "Details") {
      console.log("Details Clicked on ", res.id_user);
      props.setPatientToShow(res);
      props.setShowHistoric(true);
    }
    if (event.target.name === "Accept") {
      console.log("Accept Clicked on ", res.id_user);

      await DealWithPatientRequest(props.currentUser, res.id_user, true);
    }
    if (event.target.name === "Refuse") {
      console.log("Refuse Clicked on ", res.id_user);

      await DealWithPatientRequest(props.currentUser, res.id_user, false);
    }
  };
  return (
    <div className="container_list_patient center">
      <ul style={{ listStyleType: "none", padding: 10 }}>
        {props.patients.map((res) => (
          <li key={res.id_user}>
            <hr className="my_hr" />

            <div className="row  center">
              <div className="column_list center">
                <p className="center">{res.nom !== "" ? res.nom : res.email}</p>
              </div>
              <div className="column_list center">
                {props.isRequest ? (
                  <div>
                    <button
                      name="Accept"
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: themes[themeContext.theme].button,
                        color: themes[themeContext.theme].textcolorbtn,
                        marginTop: 0,
                        marginBottom: 10,
                        marginRight: 10,
                      }}
                      onClick={(event) => HandleClick(event, res)}
                    >
                      Accept{" "}
                    </button>
                    <button
                      name="Refuse"
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: themes[themeContext.theme].button,
                        color: themes[themeContext.theme].textcolorbtn,
                        marginTop: 0,
                        marginBottom: 10,
                      }}
                      onClick={(event) => HandleClick(event, res)}
                    >
                      Refuse{" "}
                    </button>
                  </div>
                ) : (
                  <button
                    name="Details"
                    type="submit"
                    className="btn "
                    style={{
                      backgroundColor: themes[themeContext.theme].button,
                      color: themes[themeContext.theme].textcolorbtn,
                      width: 170,
                      marginTop: 0,
                      marginBottom: 10,
                      marginLeft: 280,
                    }}
                    onClick={(event) => HandleClick(event, res)}
                  >
                    See Details
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
