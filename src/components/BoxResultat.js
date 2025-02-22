import "../App.css";
import { Box } from "@mui/material";
import CircularProgressBar from "../utils/CircularProgessBar";
import { ResultatContext } from "../Context";
import React, { useState, useContext, useEffect } from "react";
import cancer from "../pages/img/smoky_lungs.png";
import infarctus from "../pages/img/heart_attack.png";
import diabete from "../pages/img/diabete.png";
import nonInf from "../pages/img/heart_happy.png";


/**
 * This function allow us to display the result of algorithms according to response of the user 
 * the result are recalculated every time there a changes in the BoxRes2 
 * @param  {} props
 */

export default function BoxResultat(props) {
  let resultatContext = useContext(ResultatContext);
  const [Isgood, setIsGood] = useState(true);
  const [resultsInfarctus, setInfarctus] = useState(false);
  const [resultsNonInf, setNonInf] = useState(false);
  const [resultsDiab, setDiab] = useState(false);
  const [resultscancer, setcancer] = useState(false);

  useEffect(() => {
    if (resultatContext.maladies.infarctus > 2) {
      setIsGood(false);
    }
    if (resultatContext.maladies.nonInfarctus > 0) {
      setIsGood(false);
    }
    if (resultatContext.maladies.diabete > 0) {
      setIsGood(false);
    }
    if (resultatContext.maladies.cancer > 0) {
      setIsGood(false);
    }

    if (
      resultatContext.maladies.cancer > resultatContext.maladies.diabete &&
      resultatContext.maladies.cancer > resultatContext.maladies.infarctus &&
      resultatContext.maladies.cancer > resultatContext.maladies.nonInfarctus
    ) {
      setcancer(true);
      setInfarctus(false);
      setDiab(false);
      setNonInf(false);
    }

    if (
      resultatContext.maladies.diabete > resultatContext.maladies.cancer &&
      resultatContext.maladies.diabete > resultatContext.maladies.infarctus &&
      resultatContext.maladies.diabete > resultatContext.maladies.nonInfarctus
    ) {
      setDiab(true);
      setcancer(false);
      setInfarctus(false);
      setNonInf(false);
    }

    if (
      resultatContext.maladies.infarctus > resultatContext.maladies.cancer &&
      resultatContext.maladies.infarctus > resultatContext.maladies.diabete &&
      resultatContext.maladies.infarctus > resultatContext.maladies.nonInfarctus
    ) {
      setInfarctus(true);
      setDiab(false);
      setcancer(false);
      setNonInf(false);
    }

    if (
      resultatContext.maladies.nonInfarctus > resultatContext.maladies.cancer &&
      resultatContext.maladies.nonInfarctus > resultatContext.maladies.diabete &&
      resultatContext.maladies.nonInfarctus > resultatContext.maladies.infarctus
    ) {
      setNonInf(true);
      setInfarctus(false);
      setDiab(false);
      setcancer(false);
    }
 
  }, [
    resultatContext.maladies.infarctus,
    resultatContext.maladies.diabete,
    resultatContext.maladies.cancer,
    resultatContext.maladies.nonInfarctus,
  ]);

  return (
    <div>
      <h2 className="survey_title">Your results</h2>
      <div>
      {Isgood && props.currentUser.nom_role==='Patient' &&(
        <img
          className="avatar1" 
          alt="risk_img"
          src={props.currentUser.avatar}
        ></img>
      )}
      {resultsInfarctus && 
      <img className="risk_img" src={infarctus} alt="risk_img"></img>}
      {resultscancer && <img className="risk_img" src={cancer} alt="risk_img"></img>}
      {resultsDiab && <img className="risk_img" src={diabete} alt="risk_img"></img>}
      {resultsNonInf && <img className="risk_img" src={nonInf} alt="risk_img"></img>}
      </div>

      <div className="container_label3">
        <label style={{ marginTop: "10px" }} className="label_results">
          Diabete :{" "}
        </label>
        <br></br>
        <label style={{ marginTop: "40px" }} className="label_results">
          Cancer :{" "}
        </label>
        <br></br>
        <label style={{ marginTop: "40px" }} className="label_results">
          Heart attack :
        </label>
        <br></br>
        <label style={{ marginTop: "40px" }} className="label_results">
          No heart attack :
        </label>
      </div>

      <div className="container_results">
        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
            marginTop: "10px",
          }}
        >
          <CircularProgressBar progress={props.maladies.diabete} />
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
            marginTop: "10px",
          }}
        >
          <CircularProgressBar progress={props.maladies.cancer} />
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
            marginTop: "20px",
          }}
        >
          <CircularProgressBar progress={props.maladies.infarctus} />
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
            marginTop: "15px",
          }}
        >
          <CircularProgressBar progress={props.maladies.nonInfarctus} />
        </Box>
      </div>
    </div>
  );
}
