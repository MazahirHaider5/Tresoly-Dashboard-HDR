import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import arrowDown from "../assets/images/header/arrowDown.svg";
import avatar from "../assets/images/header/avatar.png";
import setting from "../assets/images/header/setting.svg";
import logout from "../assets/images/header/logout.svg";
import profile from "../assets/images/header/profile.svg";
import arrowRight from "../assets/images/header/arrowRight.svg";
import language from "../assets/images/header/language.svg";
import BA from "../assets/images/header/BA.svg";
import TFA from "../assets/images/header/2FA.svg";
import currency from "../assets/images/header/currency.svg";
import emailIcon from "../assets/images/header/email.svg";
import key from "../assets/images/header/key.svg";
import delAccount from "../assets/images/header/delete.svg";
import fillEmail from "../assets/images/header/fillEmail.svg";
import fillProfile from "../assets/images/header/fillProfile.svg";
import phone from "../assets/images/header/phone.svg";
import english from "../assets/images/header/english.svg";
import iron from "../assets/images/header/IR.svg";
import pak from "../assets/images/header/PK.svg";
import ps from "../assets/images/header/PS.svg";
import sw from "../assets/images/header/sw.svg";
import lock from "../assets/images/header/lock.svg";
import openLock from "../assets/images/header/openLock.svg";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/action/index";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/Interceptor";
import { toast } from "react-toastify";

const Profile = () => {
  const [isOpenAccountSetting, setIsOpenAccountSetting] = useState(false);
  const [isAllowBA, setIsAllowBA] = useState(false);
  const [isAllowTFA, setIsAllowTFA] = useState(false);
  const [isEmailNotification, setIsEmailNotification] = useState(false);
  const [isOpenPersonalData, setIsOpenPersonalData] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [isViewNewPassword, setIsViewNewPassword] = useState(false);
  const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone", phone);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization error");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.patch(
        "/user/updateUserProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSuccess(response.data.message);
        toast.success("User data updated successfully");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to update profile. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSpecificFieldChange = async (field, value) => {
    try {
      const response = await axiosInstance.patch(
        "/user/updateSpecificDetails",
        {
          [field]: value,
          language: selectedLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(`updated successfully`);
      } else {
        toast.error(`Failed to update`);
      }
    } catch (error) {
      console.log(`Error updating`, error);
      toast.error(`Failed to update`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstance.delete("/user/deleteAccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data.success) {
        toast.success("Account deleted successfully");
        handleLogout();
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error) {
      console.log("Error deleting account", error);
      toast.error("Failed to delete account");
    }
  };

  useEffect(() => {
    const layoutElement = document.getElementById("layout");
    if (
      isOpenAccountSetting ||
      isOpenPassword ||
      isOpenPersonalData ||
      isOpenLanguage ||
      isOpenCurrency
    ) {
      layoutElement.style.filter = "blur(3px)";
    } else {
      layoutElement.style.filter = "none";
    }
  }, [
    isOpenAccountSetting,
    isOpenPassword,
    isOpenPersonalData,
    isOpenLanguage,
    isOpenCurrency,
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/auth/loggedInUserData");
        if (response.data && response.data.success) {
          const userData = response.data.user; // Access user data correctly
          setUser(userData);
          setIsAllowBA(userData.is_biomatric);
          setIsAllowTFA(userData.is_two_factor);
          setIsEmailNotification(userData.is_email_notification);
        } else {
          toast.error("Error fetching user details");
        }
      } catch (error) {
        console.log("Error fetching user data", error);
        toast.error("Error fetching user details");
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    navigate("/sign-in");
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <>
      <Dropdown className="bg-transparent" align="end" offset={[-140, 0]}>
        <Dropdown.Toggle className="d-flex justify-content-between align-item-center border-0 px-0 fw-600 bg-transparent fs-30 text-dark dropdown-arrow-hidden">
          <img
            src={
              user?.photo
                ? `${process.env.REACT_APP_BACKEND_URL}/${user.photo.replace(
                    /\\/g,
                    "/"
                  )}`
                : avatar
            }
            width={40}
            height={40}
            alt="User Avatar"
            className="cursor-pointer rounded-circle ms-md-2"
            onClick={() => {
              console.log("Icon clicked");
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className="fs-14 pt-2 mb-0 pe-4 bg-white hover-effect"
            onClick={() => setIsOpenAccountSetting(!isOpenAccountSetting)}
          >
            <p className="fs-18 fw-400 text-color my-1">
              <img
                src={setting}
                width={22}
                height={22}
                className="me-3"
                alt="icon"
              />
              Account Settings
            </p>
          </Dropdown.Item>
          <hr className="mx-4" />
          <Dropdown.Item
            className="fs-14 mb-0  bg-white hover-effect "
            onClick={handleLogout}
          >
            <p className="fs-18 fw-400 mb-1 text-color-red">
              <img
                src={logout}
                width={22}
                height={22}
                className="me-3"
                alt="icon"
              />
              Logout
            </p>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div>
        <Offcanvas
          isOpen={isOpenAccountSetting}
          toggle={() => setIsOpenAccountSetting(!isOpenAccountSetting)}
          direction="end"
          backdrop={false}
        >
          <OffcanvasHeader
            className="border-bottom fs-16"
            toggle={() => setIsOpenAccountSetting(!isOpenAccountSetting)}
          >
            Account Settings
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="text-center">
              <img src={
              user?.photo
                ? `${process.env.REACT_APP_BACKEND_URL}/${user.photo.replace(
                    /\\/g,
                    "/"
                  )}`
                : avatar
            } width={80} height={80} alt="User Avatar" />
              <p className="fs-16 fw-600 mt-3">{user?.name || "John Smith"}</p>
              <div
                className="d-flex justify-content-between align-item-center border rounded px-2 mx-3 cursor-pointer hover-effect box-shadow-custom"
                onClick={() => {
                  setIsOpenAccountSetting(!isOpenAccountSetting);
                  setIsOpenPersonalData(!isOpenPersonalData);
                }}
              >
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={profile}
                    width={12}
                    height={12}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Personal Data
                </p>
                <img
                  src={arrowRight}
                  width={15}
                  height={15}
                  alt="User Avatar"
                  className="mt-3"
                />
              </div>
              <div
                className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom"
                onClick={() => {
                  setIsOpenAccountSetting(!isOpenAccountSetting);
                  setIsOpenLanguage(!isOpenLanguage);
                }}
              >
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={language}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Language
                </p>
                <img
                  src={arrowRight}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="mt-3"
                />
              </div>
              <div
                className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom"
                onClick={() => {
                  setIsOpenAccountSetting(!isOpenAccountSetting);
                  setIsOpenCurrency(!isOpenCurrency);
                }}
              >
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={currency}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Currency
                </p>
                <img
                  src={arrowRight}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="mt-3"
                />
              </div>
              <div
                className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom"
                onClick={() => {
                  setIsOpenAccountSetting(!isOpenAccountSetting);
                  setIsOpenPassword(!isOpenPassword);
                }}
              >
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={key}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Change Password
                </p>
                <img
                  src={arrowRight}
                  width={15}
                  height={15}
                  alt="arrow"
                  className="mt-3"
                />
              </div>
              <div className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom">
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={BA}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Biometric Auth
                </p>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={isAllowBA}
                    onClick={() => {
                      setIsAllowBA(!isAllowBA);
                      handleSpecificFieldChange("is_biomatric", !isAllowBA);
                    }}
                    className="mt-3"
                  />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom">
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={TFA}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Two Factor Auth
                </p>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={isAllowTFA}
                    onClick={() => {
                      setIsAllowTFA(!isAllowTFA);
                      handleSpecificFieldChange("is_two_factor", !isAllowTFA);
                    }}
                    className="mt-3"
                  />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom">
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={emailIcon}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Email Notification
                </p>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={isEmailNotification}
                    onClick={() => {
                      setIsEmailNotification(!isEmailNotification);
                      handleSpecificFieldChange(
                        "is_email_notification",
                        !isEmailNotification
                      );
                    }}
                    className="mt-3"
                  />
                </FormGroup>
              </div>
              <div
                className="d-flex justify-content-between border rounded px-2 mx-3 cursor-pointer mt-2 hover-effect box-shadow-custom"
                onClick={toggleDeleteModal}
              >
                <p className="mt-3 fs-13 fw-500">
                  <img
                    src={delAccount}
                    width={15}
                    height={15}
                    alt="User Avatar"
                    className="me-2"
                  />
                  Delete Account
                </p>
              </div>
            </div>
          </OffcanvasBody>
        </Offcanvas>
        {/* main canvas for Personal Data */}
        <Offcanvas
          isOpen={isOpenPersonalData}
          toggle={() => setIsOpenPersonalData(!isOpenPersonalData)}
          direction="end"
          backdrop={false}
        >
          <OffcanvasHeader
            className="border-bottom fs-16"
            toggle={() => setIsOpenPersonalData(!isOpenPersonalData)}
          >
            Personal Data
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="text-center">
              <img
                src={photo ? URL.createObjectURL(photo) : avatar}
                width={80}
                height={80}
                alt="User Avatar"
              />
              <p className="fs-16 fw-600 mt-3">{user?.name || "John Smith"}</p>
              <div className="text-center">
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  className="d-none"
                  id="photo-upload"
                />
                <Button
                  className=" fw-500 fs-15  btn-light-purple-color border-0 py-2 rounded-4"
                  type="button"
                  onClick={() =>
                    document.getElementById("photo-upload").click()
                  }
                >
                  Change
                </Button>
              </div>
              <Form className="text-start" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="Email" className=" text-color fs-14 fw-500">
                    E-mail address
                  </Label>
                  <div className="d-flex align-items-center position-relative border rounded-3">
                    <Input
                      type="email"
                      className="form-control fw-400 fs-12 border-0 ps-4 py-3 shadow-none"
                      id="Email"
                      placeholder={user?.email || "Email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <img
                      src={fillEmail}
                      height={16}
                      width={16}
                      alt="email icon"
                      className="position-absolute end-0 me-3"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label className=" text-color fs-14 fw-500" for="Name">
                    Name
                  </Label>
                  <div className="d-flex align-items-center position-relative border rounded-3">
                    <Input
                      type="text"
                      className="form-control fw-400 fs-12 border-0 ps-4 py-3 shadow-none"
                      id="Name"
                      placeholder={user.name || "Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <img
                      src={fillProfile}
                      height={16}
                      width={16}
                      alt="email icon"
                      className="position-absolute end-0 me-3"
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label className=" text-color fs-14 fw-500" for="Phone">
                    Phone No.
                  </Label>
                  <div className="d-flex align-items-center position-relative border rounded-3">
                    <Input
                      type="text"
                      className="form-control fw-400 fs-12 border-0 ps-4 py-3 shadow-none"
                      id="Phone"
                      placeholder={user.phone || "Phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <img
                      src={phone}
                      height={16}
                      width={16}
                      alt="email icon"
                      className="position-absolute end-0 me-3"
                    />
                  </div>
                </FormGroup>
              </Form>
              <div className="mt-5 pt-5">
                <Button
                  className=" fw-500 fs-15  btn-fill-color border-1 border-white py-2 px-5 rounded-4"
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {" "}
                  Save
                </Button>
              </div>
            </div>
          </OffcanvasBody>
        </Offcanvas>
        {/* main canvas for Language */}
        <Offcanvas
          isOpen={isOpenLanguage}
          toggle={() => setIsOpenLanguage(!isOpenLanguage)}
          direction="end"
          backdrop={false}
        >
          <OffcanvasHeader
            className="border-bottom fs-16"
            toggle={() => setIsOpenLanguage(!isOpenLanguage)}
          >
            Language
          </OffcanvasHeader>
          <OffcanvasBody>
            <div
              className={`d-flex justify-content-between align-item-center header-badges header-badges-heading rounded px-2 mx-3 cursor-pointer mt-2 ${
                selectedLanguage === "English" ? "bg-selected" : ""
              }`}
              onClick={() => handleLanguageChange("English")}
            >
              <p className="pt-3 fs-13 fw-500 ">
                <img
                  src={english}
                  width={18}
                  height={18}
                  alt="User Avatar"
                  className="me-2"
                />
                English
              </p>
              <p className="pt-3 fs-11 ">(English)</p>
            </div>
            <div
              className={`d-flex justify-content-between align-item-center header-badges header-badges-heading rounded px-2 mx-3 cursor-pointer mt-2 ${
                selectedLanguage === "Farsi" ? "bg-selected" : ""
              }`}
              onClick={() => handleLanguageChange("Farsi")}
            >
              <p className="pt-3 fs-13 fw-500 ">
                <img
                  src={iron}
                  width={18}
                  height={18}
                  alt="User Avatar"
                  className="me-2"
                />
                Iran
              </p>
              <p className="pt-3 fs-11 ">(فارسی)</p>
            </div>
            <div
              className={`d-flex justify-content-between align-item-center header-badges header-badges-heading rounded px-2 mx-3 cursor-pointer mt-2 ${
                selectedLanguage === "Urdu" ? "bg-selected" : ""
              }`}
              onClick={() => handleLanguageChange("Urdu")}
            >
              <p className="pt-3 fs-13 fw-500 ">
                <img
                  src={pak}
                  width={18}
                  height={18}
                  alt="User Avatar"
                  className="me-2"
                />
                Pakistan
              </p>
              <p className="pt-3 fs-11 ">(اردو)</p>
            </div>

            <div className="text-center mt-5">
              <Button
                type="button"
                className=" fw-500 fs-15  btn-fill-color border-1 border-white py-2 px-5 rounded-4"
                onClick={handleSpecificFieldChange}
              >
                {" "}
                Save
              </Button>
            </div>
          </OffcanvasBody>
        </Offcanvas>
        {/* main canvas for Currency */}
        <Offcanvas
          isOpen={isOpenCurrency}
          toggle={() => setIsOpenCurrency(!isOpenCurrency)}
          direction="end"
          backdrop={false}
        >
          <OffcanvasHeader
            className="border-bottom fs-16"
            toggle={() => setIsOpenCurrency(!isOpenCurrency)}
          >
            Currency
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="d-flex justify-content-between align-item-center header-badges header-badges-heading rounded px-2 mx-3 cursor-pointer mt-2">
              <p className="pt-3 fs-13 fw-500 ">
                <img
                  src={sw}
                  width={18}
                  height={18}
                  alt="User Avatar"
                  className="me-2"
                />
                Switzerland
              </p>
              <p className="pt-3 fs-11 ">CHF</p>
            </div>
            <div className="d-flex justify-content-between align-item-center header-badges header-badges-heading rounded px-2 mx-3 cursor-pointer mt-2">
              <p className="pt-3 fs-13 fw-500 ">
                <img
                  src={english}
                  width={18}
                  height={18}
                  alt="User Avatar"
                  className="me-2"
                />
                English (UK)
              </p>
              <p className="pt-3 fs-11 ">GBP</p>
            </div>
            <div className="d-flex justify-content-between align-item-center header-badges header-badges-heading rounded px-2 mx-3 cursor-pointer mt-2">
              <p className="pt-3 fs-13 fw-500 ">
                <img
                  src={pak}
                  width={18}
                  height={18}
                  alt="User Avatar"
                  className="me-2"
                />
                Pakistan
              </p>
              <p className="pt-3 fs-11 ">PKR</p>
            </div>

            <div className="text-center mt-5">
              <Button
                type="button"
                className=" fw-500 fs-15  btn-fill-color border-1 border-white py-2 px-5 rounded-4"
              >
                {" "}
                Save
              </Button>
            </div>
          </OffcanvasBody>
        </Offcanvas>
        {/* main canvas for Change password */}
        <Offcanvas
          isOpen={isOpenPassword}
          toggle={() => setIsOpenPassword(!isOpenPassword)}
          direction="end"
          backdrop={false}
        >
          <OffcanvasHeader
            className="border-bottom fs-16"
            toggle={() => setIsOpenPassword(!isOpenPassword)}
          >
            Change Password
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="text-center pb-2 ">
              <Form className="text-start">
                <FormGroup>
                  <Label for="password" className=" text-color fs-14 fw-500">
                    Password
                  </Label>
                  <div className="d-flex align-items-center position-relative border  rounded-3">
                    <Input
                      type={isViewPassword ? "text" : "password"}
                      className="form-control fw-400 fs-12 border-0 ps-4 py-3 shadow-none"
                      id="password"
                      placeholder="Enter Password"
                    />
                    <img
                      src={isViewPassword ? openLock : lock}
                      height={16}
                      width={16}
                      alt="email icon"
                      className="position-absolute end-0 me-3 cursor-pointer"
                      onClick={() => setIsViewPassword(!isViewPassword)}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label className=" text-color fs-14 fw-500" for="NewPassword">
                    New Password
                  </Label>
                  <div className="d-flex align-items-center position-relative border rounded-3">
                    <Input
                      type={isViewNewPassword ? "text" : "password"}
                      className="form-control fw-400 fs-12 border-0 ps-4 py-3 shadow-none"
                      id="NewPassword"
                      placeholder="Enter New Password"
                    />
                    <img
                      src={isViewNewPassword ? openLock : lock}
                      height={16}
                      width={16}
                      alt="email icon"
                      className="position-absolute end-0 me-3 cursor-pointer"
                      onClick={() => setIsViewNewPassword(!isViewNewPassword)}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label
                    className=" text-color fs-14 fw-500"
                    for="confirmPassword"
                  >
                    Confirm Password
                  </Label>
                  <div className="d-flex align-items-center position-relative border rounded-3">
                    <Input
                      type={isViewConfirmPassword ? "text" : "password"}
                      className="form-control fw-400 fs-12 border-0 ps-4 py-3 shadow-none"
                      id="confirmPassword"
                      placeholder="Enter Confirm Password"
                    />
                    <img
                      src={isViewConfirmPassword ? openLock : lock}
                      height={16}
                      width={16}
                      alt="email icon"
                      className="position-absolute end-0 me-3 cursor-pointer"
                      onClick={() =>
                        setIsViewConfirmPassword(!isViewConfirmPassword)
                      }
                    />
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 password-strength-indicator">
              <li className="w-25 "></li>
              <li className="w-25 "></li>
              <li className="w-25 "></li>
              <li className="w-25 "></li>
            </div>
            <div className="mt-5 pt-5 d-flex justify-content-center align-item-end">
              <Button
                type="button"
                className=" fw-500 fs-15  btn-fill-color border-1 border-white py-2 px-5 rounded-4 mt-5"
              >
                {" "}
                Save
              </Button>
            </div>
          </OffcanvasBody>
        </Offcanvas>
      </div>
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteAccount}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <style>
        {`
          .bg-selected {
            background-color: #d3d3d3; /* Change to your preferred color */
          }
        `}
      </style>
    </>
  );
};

export default Profile;
