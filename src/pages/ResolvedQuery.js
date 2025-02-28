import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../services/Interceptor";
import { TailSpin } from "react-loader-spinner";
import "../assets/style/globals.css";
import "react-calendar/dist/Calendar.css";
import { Button, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import breadcrumbHome from "../assets/images/breadcrumbHome.svg";
import breadcrumbArrowRight from "../assets/images/breadcrumbArrowRight.svg";
import calendar from "../assets/images/calendar.svg";
import pendingClockIcon from "../assets/images/admin/pendingClockIcon.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ResolvedQuery = () => {
  const { complaintId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { complaint: passedComplaint } = location.state || {};
  const [complaint, setComplaint] = useState(passedComplaint || null);
  const [loading, setLoading] = useState(!passedComplaint);
  const [error, setError] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const queryData = useSelector((state) => state.complaint);
  const initialValues = {
    replyText: "",
  };
  const validationSchema = Yup.object({
    replyText: Yup.string()
      .required("Reply is required")
      .min(5, "Must be at least 5 characters"),
  });

  useEffect(() => {
    // Only fetch if no complaint was passed
    if (!passedComplaint) {
      const fetchComplaint = async () => {
        try {
          const response = await axiosInstance.get(`/complaint/getComplaint/${complaintId}`);

          if (response.data.success) {
            setComplaint(response.data.complaint);
          } else {
            setError(response.data.message);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchComplaint();
    }
  }, [complaintId, passedComplaint]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  const handelReply = async (values) => {
    if (!complaint || !complaint.ticket_id) {
      console.error("Complaint data is not loaded yet.", complaint);
      return;
    }

    try {
      setBtnLoader(true);

      const payload = {
        ticket_id: complaint.ticket_id,
        replyText: values.replyText,
        email: complaint.complain_user_email,
      };

      console.log("Request Payload:", payload);

      const result = await axiosInstance.post("/admin/ticketReply", payload);

      if (result.status === 200) {
        toast(result.data.message, "success", "top-end");
        dispatch(setComplaint(null));
        navigate(-1);
      } else {
        setBtnLoader(false);
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setBtnLoader(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-start gap-2">
        <img
          src={breadcrumbHome}
          width={20}
          height={20}
          alt="home"
          className="cursor-pointer"
        />
        <img
          src={breadcrumbArrowRight}
          width={20}
          height={20}
          alt="rightArrow"
        />
        <p className="fs-14 text-muted fw-500 cursor-pointer">
          Support & Queries
        </p>
        <img
          src={breadcrumbArrowRight}
          width={20}
          height={20}
          alt="rightArrow"
        />
        <p className="fs-14 fw-500 dark-purple cursor-pointer">
          {complaint?.ticket_id}
        </p>
      </div>
      <div className="d-flex justify-content-between mt-3 flex-wrap">
        <p className="fs-30 fw-500">Personal Information</p>
        <p className="fs-16 fw-500 text-color">
          <img src={calendar} alt="icon" className="me-2" />{" "}
          {new Date(complaint?.createdAt).toLocaleString()}
        </p>
      </div>
      {complaint ? (
        <div>
          <div className="d-flex justify-content-start mt-2 ">
            <p className="fs-20 fw-600">Name</p>
            <span className="bg-light-purple dark-purple px-2 fs-14 ms-3 fw-500 py-1 rounded ">
              {complaint?.complain_user_name}
            </span>
          </div>

          <p className="fs-20 fw-600 mt-2">Reply</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handelReply(values)}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <Field
                    as="textarea"
                    id="replyText"
                    name="replyText"
                    rows="8"
                    placeholder="Enter Reply"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="replyText"
                    component="div"
                    className="text-danger mt-1 fs-14"
                  />
                </div>
                <div className="mb-5 text-end">
                  <Button
                    className="fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-5 rounded"
                    type="submit"
                    disabled={!complaint || btnLoader}
                  >
                    {btnLoader ? (
                      <div
                        className="spinner-border spinner-border-sm fs-12 text-primary"
                        role="status"
                      ></div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <p>No complaint data found.</p>
      )}
    </div>
  );
};

export default ResolvedQuery;