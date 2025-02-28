import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import eye from "../assets/images/auth/eye.svg";
import crossEye from "../assets/images/auth/cross-eye.svg";
import logoTitle from "../assets/images/auth/logoTitle.svg";
import axiosInstance from "../services/Interceptor";
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.phone || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
        const response = await axiosInstance.post("/auth/signUp", {
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            password: formData.password,
        });
        if  (response.data.success) {
            // toast.success(response.data.message);
            navigate("/sign-in");
        } else {
            setErrorMessage(response.data.message);
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  }

  return (
    <div className="container-fluid authBgImg">
  <div className="row w-100">
    <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
      <div className="p-lg-3 p-2">
        <div className="text-center">
          <img src={logoTitle} alt="icon" className="img-fluid" />
        </div>
        <h4 className="fs-25 text-center text-white letter-spacing-15 mt-3">
          Create New Account
        </h4>
        <p className="fs-15 fw-300 text-center text-white">
          Please enter the following to complete registration process.
        </p>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className="visually-hidden" htmlFor="Email">
              Email
            </Label>
            <Input
              id="Email"
              name="email"
              placeholder="Email"
              className="shadow-none border-0 border-bottom auth-input-color bg-transparent text-white"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <Label className="visually-hidden" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              className="shadow-none border-0 border-bottom auth-input-color bg-transparent text-white"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <Label className="visually-hidden" htmlFor="phone">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Phone"
              className="shadow-none border-0 border-bottom auth-input-color bg-transparent text-white"
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <div className="position-relative border-bottom">
              <Input
                name="password"
                type={isViewPassword ? "text" : "password"}
                className="form-control auth-input-color fw-400 pb-2 shadow-none border-0 bg-transparent text-white"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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
          </FormGroup>
          <FormGroup className="mt-4">
            <div className="position-relative border-bottom">
              <Input
                name="confirmPassword"
                type={isViewConfirmPassword ? "text" : "password"}
                className="form-control auth-input-color fw-400 pb-2 shadow-none border-0 bg-transparent text-white"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <div className="position-absolute top-0 end-0 pt-2">
                <img
                  src={isViewConfirmPassword ? crossEye : eye}
                  height={25}
                  width={25}
                  className="cursor-pointer"
                  onClick={() => setIsViewConfirmPassword(!isViewConfirmPassword)}
                  alt="Toggle Confirm Password Visibility"
                  />
              </div>
            </div>
          </FormGroup>
          <div className="d-grid gap-3 mt-4">
            <Button
              className="fw-500 fs-15 btn-auth-outline-color py-3"
              type="submit"
              disabled={loading}
            >
                {loading ? (
                    <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
                ) : (
                    "Sign Up"
                )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</div>

  );
}

export default SignUp;
