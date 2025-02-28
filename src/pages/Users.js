import React, { useState, useEffect } from "react";
import "../assets/style/globals.css";
import "../assets/style/pagination.css";
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dropdown } from "react-bootstrap";
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
import dots from "../assets/images/dots.svg";
import calendar from "../assets/images/calendar.svg";
import previousIcon from "../assets/images/admin/previousArrow.svg";
import nextIcon from "../assets/images/admin/nextArrow.svg";
import activeIcon from "../assets/images/admin/activeIcon.svg";
import inActiveIcon from "../assets/images/admin/inactiveIcon.svg";
import Pagination from "../components/Pagination";
import searchIcon from "../assets/images/admin/searchIcon.svg";
import axiosInstance from "../services/Interceptor";
import { toast } from "react-toastify";
// Import the loader spinner component
import { TailSpin } from "react-loader-spinner";

const DropdownMenu = ({ user, onStatusChange }) => {
  return (
    <Dropdown className="bg-white" align="end" offset={[-140, 0]}>
      <Dropdown.Toggle className="border-0 bg-white dropdown-arrow-hidden">
        <img src={dots} alt="Options" width={20} height={20} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          className="pb-0"
          onClick={() => onStatusChange("activate", user._id)}
        >
          <p className="fs-15 fw-600 text-success text-center pt-1 pb-0 ">
            <img src={activeIcon} alt="icon" className="me-1" /> Activate
          </p>
        </Dropdown.Item>
        <hr className="mx-3" />
        <Dropdown.Item
          className="pb-0"
          onClick={() => onStatusChange("deactivate", user._id)}
        >
          <p className="fs-15 fw-600 text-danger text-center pt-1 pb-0">
            <img src={inActiveIcon} alt="icon" className="me-1" /> Deactivate
          </p>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Users = () => {
  const [isAddUser, setIsAddUser] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDurationDate, setShowDurationDate] = useState(false);
  const [durationDate, setDurationDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState("");
  const [email, setEmailAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);

      try {
        const response = await axiosInstance.get("/user/allUsers");
        console.log("response on User.js get users: ", response);
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        setErrorUsers(
          error.response.data.message ||
            "An error occurred while fetching users"
        );
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const layoutElement = document.getElementById("layout");
    if (isAddUser) {
      layoutElement.style.filter = "blur(3px)";
    } else {
      layoutElement.style.filter = "none";
    }
  }, [isAddUser]);

  // Filter users based on search term (by name or email)
  const filteredUsers = users.filter((user) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch)
    );
  });
  async function addUser() {
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        process.env.REACT_APP_BACKEND_URL + "/admin/setPasswordLink",
        { email }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAddUser(false);
      }
    } catch (error) {
      toast.error("Error adding user");
    }
    setLoading(false);
  }

  const itemsPerPage = 10;
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDurationDate = (selectedDate) => {
    setDurationDate(selectedDate);
    setShowDurationDate(false);
  };

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

  const handleStatusChange = async (action, user_id) => {
    try {
      const response = await axiosInstance.put(
        "/admin/activateOrDeactivate",
        null,
        { params: { action, user_id } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // Update local state so that the UI reflects the new status:
        const updatedUsers = users.map((user) =>
          user._id === user_id
            ? {
                ...user,
                account_status: action === "activate" ? "active" : "inactive",
              }
            : user
        );
        setUsers(updatedUsers);
      } else {
        toast.error(response.data.message || "Error performing action");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error performing action");
    }
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between gap-2 flex-wrap ">
        <div>
          <p className="text-color fs-25 fw-500 p-0 m-0">
            Total Users : {totalItems}
          </p>
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
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
              <span className="fw-600 fs-15">+</span> New User
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded">
        {/* Conditionally render the loader if users are loading */}
        {loadingUsers ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <TailSpin
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th className="table-head-bg text-nowrap ps-5 py-3">NAME</th>
                  <th className="table-head-bg text-nowrap py-3">EMAIL</th>
                  <th className="table-head-bg text-nowrap py-3">SIGNUP</th>
                  <th className="table-head-bg text-nowrap py-3">LAST LOGIN</th>
                  <th className="table-head-bg text-nowrap py-3">STATUS</th>
                  <th className="table-head-bg text-nowrap py-3">Options</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((user, index) => (
                  <tr className="text-nowrap" key={user._id || index}>
                    <th scope="row" className="py-3 ps-5">
                      <p className="fs-16 fw-500">
                        {user.name ? user.name : "Tresoly User"}
                      </p>
                    </th>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {user.email}
                    </td>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {formatDateTime(user.signup_date)}
                    </td>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {formatDateTime(user.last_login)}
                    </td>
                    <td className="fs-14 fw-500 py-3 tab-text-color">
                      {user.account_status === "active" ? (
                        <p className="text-success">
                          <img
                            src={activeIcon}
                            alt="active"
                            className="me-1"
                            width={15}
                            height={15}
                          />
                          Active
                        </p>
                      ) : (
                        <p className="text-danger">
                          <img
                            src={inActiveIcon}
                            alt="inactive"
                            className="me-1"
                            width={15}
                            height={15}
                          />
                          Inactive
                        </p>
                      )}
                    </td>
                    <td className="text-start">
                      <DropdownMenu
                        user={user}
                        onStatusChange={handleStatusChange}
                      />
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
        />
        <ModalBody>
          <h2 className="fs-20 fw-600 text-center mt-0"> Add User</h2>
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
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="text-center">
              <Button
                type="button"
                className="fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-5 text-center"
                onClick={addUser}
              >
                {loading ? "sending" : "SendLink"}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Users;