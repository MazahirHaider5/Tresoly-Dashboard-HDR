import React, { useState, useEffect } from "react";
import "../assets/style/globals.css";
import "../assets/style/pagination.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Table, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Form, Card } from "reactstrap";
import calendar from "../assets/images/calendar.svg";
import previousIcon from "../assets/images/admin/previousArrow.svg";
import nextIcon from "../assets/images/admin/nextArrow.svg";
import Pagination from "../components/Pagination";
import axiosInstance from "../services/Interceptor";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Compliance = () => {
  // State for activities (API data)
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorActivities, setErrorActivities] = useState(null);

  // Pagination state for activities
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    const fetchActivities = async () => {
      setLoadingActivities(true);
      try {
        const response = await axiosInstance.get("/activities/getAllActivities");
        console.log("Activities response:", response);
        if (response.data.success) {
          setActivities(response.data.activities);
        } else {
          setErrorActivities(response.data.message);
        }
      } catch (err) {
        setErrorActivities(err.message);
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, []);

  const totalItems = activities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <p className="fs-28 fw-500 mb-0 mt-2">Activities</p>
      {loadingActivities ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        </div>
      ) : errorActivities ? (
        <p className="text-danger">{errorActivities}</p>
      ) : (
        <div className="border rounded mb-5">
          <Table responsive>
            <thead>
              <tr>
                <th className="table-head-bg text-nowrap ps-5 py-3">ACTIVITY ID</th>
                <th className="table-head-bg text-nowrap py-3">USER EMAIL</th>
                <th className="table-head-bg text-nowrap py-3">ACTIVITY TYPE</th>
                <th className="table-head-bg text-nowrap py-3">DATE</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((activity, index) => (
                <tr className="text-nowrap" key={activity._id || index}>
                  <th scope="row" className="py-3 ps-5">
                    <p className="fs-16 fw-500">{activity._id}</p>
                  </th>
                  <td className="fs-14 fw-500 py-3">
                    {activity.userId?.email}
                  </td>
                  <td className="fs-14 fw-500 py-3">
                    {activity.activityType}
                  </td>
                  <td className="fs-14 fw-500 py-3">
                    {formatDateTime(activity.createdAt)}
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
                onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
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
                onClick={() => currentPage !== totalPages && setCurrentPage(currentPage + 1)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compliance;
