import React, { useState, useEffect } from "react";
import "../assets/style/globals.css";
import "../assets/style/pagination.css";
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dropdown } from "react-bootstrap";
import {
  Button,
  Card,
  Table,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";
import totalTicketsIcon from "../assets/images/admin/totalTicket.svg";
import pendingTicketIcon from "../assets/images/admin/pendingTicket.svg";
import resolvedTicketIcon from "../assets/images/admin/resolvedTicket.svg";
import previousIcon from "../assets/images/admin/previousArrow.svg";
import nextIcon from "../assets/images/admin/nextArrow.svg";
import pendingClockIcon from "../assets/images/admin/pendingClockIcon.svg";
import tickIcon from "../assets/images/admin/activeIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/Interceptor";
import { TailSpin } from "react-loader-spinner";
import Pagination from "../components/Pagination";

const SupportQueries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/complaint/getComplaints");
        console.log("response in SupportQueries", response);
        if (response.data.success) {
          setComplaints(response.data.complaints);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((complaint) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      complaint.issue?.toLowerCase().includes(lowerSearch) ||
      complaint.subject?.toLowerCase().includes(lowerSearch)
    );
  });

  const itemsPerPage = 10;
  const totalItems = filteredComplaints.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const Resolvedtickets = complaints.filter(
    (complaint) => complaint.complaint_status === "Resolved"
  ).length;
  const Pendingtickets = complaints.filter(
    (complaint) => complaint.complaint_status === "Pending"
  ).length;

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

  
  const handleComplaintClick = (complaint) => {
    navigate(`/resolved-query/${complaint._id}`, { state: { complaint } });
  };
  

  return (
    <div className="container">
      <p className="fs-28 fw-500 mb-0 mt-2">Overview</p>
      <div className="row mt-4">
        <div className="col-12 col-md-6 col-lg-4 mb-3 mb-xl-0">
          <Card className="bg-white box-shadow-custom py-3">
            <div className="d-flex justify-content-start align-items-center">
              <div className="rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3">
                <img
                  src={totalTicketsIcon}
                  alt="Total Tickets"
                  width={43}
                  height={43}
                />
              </div>
              <div>
                <p className="text-color fs-14 fw-500 mb-0">Total Tickets</p>
                <p className="fs-25 fw-600 m-0">{complaints.length}</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-3 mb-xl-0">
          <Card className="bg-white box-shadow-custom py-3">
            <div className="d-flex justify-content-start align-items-center">
              <div className="rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3">
                <img
                  src={resolvedTicketIcon}
                  alt="Resolved Tickets"
                  width={43}
                  height={43}
                />
              </div>
              <div>
                <p className="text-color fs-14 fw-500 mb-0">Resolved Tickets</p>
                <p className="fs-25 fw-600 m-0">{Resolvedtickets}</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-3 mb-xl-0">
          <Card className="bg-white box-shadow-custom py-3">
            <div className="d-flex justify-content-start align-items-center">
              <div className="rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3">
                <img
                  src={pendingTicketIcon}
                  alt="Pending Tickets"
                  width={43}
                  height={43}
                />
              </div>
              <div>
                <p className="text-color fs-14 fw-500 mb-0">Pending Tickets</p>
                <p className="fs-25 fw-600 m-0">{Pendingtickets}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <p className="fs-28 fw-500 mb-0 mt-2">Queries</p>
      <div className="border rounded mt-3 mb-5">
        {loading ? (
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
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th className="table-head-bg text-nowrap ps-5 py-3">
                  TICKET ID
                </th>
                <th className="table-head-bg text-nowrap py-3">ISSUE</th>
                <th className="table-head-bg text-nowrap py-3">SUBJECT</th>
                <th className="table-head-bg text-nowrap py-3">DATE</th>
                <th className="table-head-bg text-nowrap py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((complaint, index) => (
                <tr className="text-nowrap" key={complaint._id || index}>
                  <th scope="row" className="py-3 ps-5">
                    <p className="fs-16 fw-500">{complaint.ticket_id}</p>
                  </th>
                  <td className="fs-14 fw-500 py-3 tab-text-color">
                    {complaint.issue}
                  </td>
                  <td className="fs-14 fw-500 py-3 tab-text-color">
                    {complaint.subject}
                  </td>
                  <td className="fs-14 fw-500 py-3 tab-text-color">
                    {formatDateTime(complaint.createdAt)}
                  </td>
                  <td className="fs-12 fw-500 py-3 tab-text-color">
                    {complaint.complaint_status === "Pending" ? (
                      <p
                      className="text-warning cursor-pointer"
                      onClick={() => handleComplaintClick(complaint)}
                    >
                      <img
                        src={pendingClockIcon}
                        alt="pending"
                        className="me-1"
                        width={14}
                        height={14}
                      /> 
                      Pending
                    </p>
                    ) : (
                      <p className="text-success">
                        <img
                          src={tickIcon}
                          alt="resolved"
                          className="me-1"
                          width={12}
                          height={12}
                        />{" "}
                        Resolved
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

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
              onClick={() =>
                currentPage !== totalPages && setCurrentPage(currentPage + 1)
              }
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportQueries;
