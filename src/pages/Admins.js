import React, { useState, useEffect } from "react";
import "../assets/style/globals.css";
import "../assets/style/pagination.css";
import "react-calendar/dist/Calendar.css";
import {
  Button,
  Table,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";
import previousIcon from "../assets/images/admin/previousArrow.svg";
import nextIcon from "../assets/images/admin/nextArrow.svg";
import Pagination from "../components/Pagination";
import searchIcon from "../assets/images/admin/searchIcon.svg";
import axiosInstance from "../services/Interceptor";
import { toast } from "react-toastify";
// Import the loader spinner component
import { TailSpin } from "react-loader-spinner";

const Admins = () => {
  const [isAddUser, setIsAddUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [errorAdmins, setErrorAdmins] = useState(null);
  const [promotionalEmail, setPromotionalEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoadingAdmins(true);
      try {
        const response = await axiosInstance.get("/user/allUsers");
        console.log("response on Admin.js get adminssssss ", response);
        if (response.data.success) {
          const allUsers = response.data.data;
          const adminUsers = allUsers.filter(
            (user) => user.role && user.role.toLowerCase() === "admin"
          );
          setAdmins(adminUsers);
        } else {
          setErrorAdmins(response.data.message || "Error fetching admins");
        }
      } catch (error) {
        setErrorAdmins(
          error.response?.data?.message || "Error fetching admins"
        );
      } finally {
        setLoadingAdmins(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleSendLink = async () => {
    if (!promotionalEmail) {
      toast.error("Please enter email address you want to send the link to");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/admin/sendAdminPromotionLink", { email: promotionalEmail });
      if (response.data.success) {
        toast.success("Email sent successfully");
        setIsAddUser(false);
      } else {
        toast.error(response.data.message || "Error sending link");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending link");
    } finally {
      setLoading(false);
    }
  };

  const itemsPerPage = 10;
  const totalItems = admins.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = admins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const layoutElement = document.getElementById("layout");
    if (isAddUser) {
      layoutElement.style.filter = "blur(3px)";
    } else {
      layoutElement.style.filter = "none";
    }
  }, [isAddUser]);

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between gap-2 flex-wrap ">
        <div>
          <p className="text-color fs-25 fw-500 p-0 m-0">Total Admins : {totalItems}</p>
        </div>
        <div className="d-md-flex justify-content-md-start gap-3">
          <div>
            <FormGroup>
              <div className="search-container position-relative bg-light p-0">
                <div className="search-icon position-absolute top-50 start-0 translate-middle-y mx-3">
                  <img
                    src={searchIcon}
                    height={25}
                    width={25}
                    className="cursor-pointer"
                    alt="Search Icon"
                  />
                </div>
                <Input
                  type="text"
                  className="search-input search-input-slim-height form-control fw-400 ps-5 text-muted border-0 rounded-4"
                  placeholder="Search"
                />
              </div>
            </FormGroup>
          </div>

          <div>
            <Button
              type="button"
              className="fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-5 mb-3"
              onClick={() => setIsAddUser(!isAddUser)}
            >
              <span className="fw-600 fs-15">+</span> New Admin
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded">
        {loadingAdmins ? (
          // Display the loader while admins are loading
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
          </div>
        ) : (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th className="table-head-bg text-nowrap ps-5 py-3">NAME</th>
                  <th className="table-head-bg text-nowrap py-3">EMAIL</th>
                  <th className="table-head-bg text-nowrap py-3">PHONE No.</th>
                  <th className="table-head-bg text-nowrap py-3">SIGNUP</th>
                  <th className="table-head-bg text-nowrap py-3">LAST LOGIN</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((admin, index) => (
                  <tr className="text-nowrap" key={index}>
                    <th scope="row" className="py-3 ps-5">
                      <p className="fs-16 fw-500">{admin.name ? admin.name : "Tresoly Admin"}</p>
                    </th>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {admin.email}
                    </td>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {admin.phone}
                    </td>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {formatDateTime(admin.signup_date)}
                    </td>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {formatDateTime(admin.last_login)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center px-3 py-2 p-md-3">
              <div className="d-none d-md-block">
                <Button
                  outline
                  className="btn-outline-color-pagination"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <img src={previousIcon} alt="icon" width={20} /> Previous
                </Button>
              </div>
              <div className="d-block d-md-none">
                <img
                  src={previousIcon}
                  alt="icon"
                  width={20}
                  onClick={() =>
                    currentPage !== 1 && setCurrentPage(currentPage - 1)
                  }
                  className="cursor-pointer"
                />
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
              <div className="d-none d-md-block">
                <Button
                  outline
                  className="btn-outline-color-pagination"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <img src={nextIcon} alt="icon" width={20} />
                </Button>
              </div>
              <div className="d-block d-md-none">
                <img
                  src={nextIcon}
                  alt="icon"
                  width={20}
                  onClick={() => {
                    currentPage !== totalPages &&
                      setCurrentPage(currentPage + 1);
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        isOpen={isAddUser}
        toggle={() => setIsAddUser(!isAddUser)}
        backdrop={false}
      >
        <ModalHeader
          toggle={() => setIsAddUser(!isAddUser)}
          className="border-0"
        ></ModalHeader>
        <ModalBody>
          <h2 className="fs-20 fw-600 text-center mt-0"> Add Admin</h2>
          <Form>
            <FormGroup>
              <Label for="email" className="fs-14 fw-500">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter Email"
                type="email"
                value={promotionalEmail}
                onChange={(e) => setPromotionalEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="text-center">
              <Button
                type="button"
                className="fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-5 text-center"
                onClick={handleSendLink}
                disabled={loading}
              >
                Send Link
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Admins;
