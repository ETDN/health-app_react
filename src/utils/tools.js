import React, { useContext } from "react";
import { ResultatContext, ThemeContext, themes } from "../Context";

export const BouncingDotsLoader = (props) => {
  return (
    <div className="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export function getObjKey(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

export function FormInput({
  disabled,
  id,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
}) {

  let themeContext = useContext(ThemeContext);

  return (
    <>
      <label>{label}</label>
      <input style={{ width: "50px", marginRight: "10px", marginLeft: "5px", color: themes[themeContext.theme].textcolor }}
        disabled={disabled}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      <br />
    </>
  );
}

export function GetTodayDateString() {
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();

  const dateString =
    currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

  return dateString;
}