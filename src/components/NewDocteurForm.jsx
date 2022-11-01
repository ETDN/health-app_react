import "../App.css";
import React from "react";
import { Formik } from "formik";
import { Docteur } from "../objects/Docteur";
import { firebaseConfig } from "../initFirebase";

const initialValues = {
  email: "",
  nom: "",
  password: "",
  repassword: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.nom) {
    errors.nom = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address entered";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password < 6) {
    errors.password = "Must contains at least 6 characters";
  }

  if (!values.repassword) {
    errors.repassword = "Required";
  } else if (values.repassword !== values.password) {
    errors.repassword = "Must match Password";
  }
  return errors;
};

export default function NewDocteurForm({handleSubmit}) {
  

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { resetForm, setErrors, setSubmitting }) => {
        try {
          console.log("Value : ", values);
          handleSubmit(values);
        } catch (e) {}
      }}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                className={
                  errors.email && touched.email
                    ? "email_input_error"
                    : "email_input"
                }
              />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="form-row">
              <input
                type="text"
                name="nom"
                id="nom"
                value={values.nom}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nom Complet"
                className={
                  errors.nom && touched.nom
                    ? "email_input_error"
                    : "email_input"
                }
              />
              {errors.nom && touched.nom && (
                <span className="error">{errors.nom}</span>
              )}
            </div>
            <div className="form-row">
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className={
                  errors.password && touched.password
                    ? "password_input_error"
                    : "password_input"
                }
              />
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="form-row">
              <input
                type="password"
                name="repassword"
                id="repassword"
                value={values.repassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm Password"
                className={
                  errors.repassword && touched.repassword
                    ? "password_input_error"
                    : "password_input"
                }
              />
              {errors.repassword && touched.repassword && (
                <span className="error">{errors.repassword}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn_submit"
              disabled={!isValid}
            >
              Register New Doctor
            </button>
          </form>
        );
      }}
    </Formik>
  );
}
