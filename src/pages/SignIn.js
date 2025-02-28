import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import eye from "../assets/images/auth/eye.svg";
import crossEye from "../assets/images/auth/cross-eye.svg";
import logoTitle from "../assets/images/auth/logoTitle.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik"; 

import {
  setUserEmail,
  setOTPStatus,
  setAuth,
  setUserData,
} from "../redux/action";
import axiosInstance from "../services/Interceptor";

function SignIn() {
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character."
      ),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSignIn = async (values) => {
    try {
      setBtnLoader(true);
      const result = await axiosInstance.post("/auth/login", values);
      if (result.status === 200) {
        localStorage.setItem("token", result?.data?.accessToken);
        console.log("Tokennnnnn in login", result?.data?.accessToken);
        
        dispatch(setUserData(result?.data?.user));
        dispatch(setUserEmail(values.email));
        dispatch(setAuth(true));
        dispatch(setOTPStatus("login"));
        // navigate("/");
      } else {
        setBtnLoader(false);
      }
    } catch (error) {
      setBtnLoader(false);
    }
  };

  return (
    <div className="container-fluid authBgImg">
      <div className="row">
        <div className="col-12  col-md-10 offset-md-1 col-lg-6 offset-lg-3">
          <div className=" m-lg-1 p-2 p-md-5 ">
            <div className="text-center">
              <img src={logoTitle} alt="icon" className="img-fluid" />
            </div>
            <h4 className="fs-30 fw-500 mt-3 mt-lg-2 pt-lg-2 text-center text-white  letter-spacing-15">
              Welcome Back!
            </h4>
            <p className=" fs-19 fw-300 text-center mt-3 text-white">
              Glad to have you back
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup className="mt-5">
                    <Label className="visually-hidden" htmlFor="email">
                      Email
                    </Label>
                    <Field
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="shadow-none border-0 border-bottom auth-input-color rounded-top rounded-left rounded-right rounded-0 ps-0 bg-transparent text-white form-control"
                      type="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </FormGroup>

                  <FormGroup className="mt-5">
                    <div className="position-relative border-0 border-bottom">
                      <Field
                        name="password"
                        type={isViewPassword ? "text" : "password"}
                        className="form-control auth-input-color mt-2 fw-400 pb-2 shadow-none border-0 ps-0 bg-transparent text-white rounded-top rounded-left rounded-right rounded-0"
                        placeholder="Password"
                      />
                      <div className="position-absolute top-0 end-0 pt-2">
                        <img
                          src={isViewPassword ? crossEye : eye}
                          height={25}
                          width={25}
                          className="cursor-pointer"
                          onClick={() => setIsViewPassword(!isViewPassword)}
                          alt=""
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </FormGroup>

                  <div className="d-flex justify-content-between mt-3">
                    <FormGroup
                      check
                      inline
                      className="d-flex justify-content-between align-item-center gap-2"
                    >
                      <Field type="checkbox" name="rememberMe" />
                      <Label check className="fs-13 fw-500 mt-1 text-white">
                        Remember for 30 days
                      </Label>
                    </FormGroup>
                    <div>
                      <Link
                        to="/forgot-password"
                        className="text-decoration-none fs-13 fw-500 dark-purple"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  
                  <div className="d-grid gap-3">
                    <Button
                      className="fw-500 fs-15 btn-auth-outline-color py-3"
                      type="submit"
                    >
                      {btnLoader ? (
                        <div
                          className="spinner-border spinner-border-sm fs-12 text-white"
                          role="status"
                        ></div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                  <div className="d-flex justify-content-start mt-1">
                    <Link to="/sign-up" className="text-decoration-none fs-13 fw-500 dark-purple">
                      Don't have an account? <span className="text-white border-bottom border-white">Sign up</span>
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
