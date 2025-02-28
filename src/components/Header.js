import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";
import Sidebar_style from "../assets/style/canvasSidebar.css";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";

import classNames from "classnames";
import Sidebar from "./Sidebar";
import openbaricon from "../assets/images/sidebar/admin/baricon.svg";
import Icon from "../assets/images/sidebar/admin/logo.svg";
import logout from "../assets/images/sidebar/admin/logout.svg";
import chart from "../assets/images/sidebar/admin/chart.svg";
import chartActive from "../assets/images/sidebar/admin/chartActive.svg";
import compliance from "../assets/images/sidebar/admin/compliance.svg";
import complianceActive from "../assets/images/sidebar/admin/complianceActive.svg";
import dashboard from "../assets/images/sidebar/admin/dashboard.svg";
import dashboardActive from "../assets/images/sidebar/admin/dashboardActive.svg";
import operational from "../assets/images/sidebar/admin/operational.svg";
import operationalActive from "../assets/images/sidebar/admin/operationalActive.svg";
import profile from "../assets/images/sidebar/admin/profile.svg";
import profileActive from "../assets/images/sidebar/admin/profileActive.svg";
import queries from "../assets/images/sidebar/admin/queries.svg";
import queriesActive from "../assets/images/sidebar/admin/queriesActive.svg";
import subscription from "../assets/images/sidebar/admin/subscription.svg";
import subscriptionActive from "../assets/images/sidebar/admin/subscriptionActive.svg";
import metrics from "../assets/images/sidebar/admin/metrics.svg";
import metricsActive from "../assets/images/sidebar/admin/metricsActive.svg";
import { toast } from "react-toastify";
import axiosInstance from "../services/Interceptor";

const Header = ({ title, isShowIcon }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/auth/loggedInUserData", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.data && response.data.success) {
          const userData = response.data.user; // Access user data correctly
          setUser(userData);
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

  useEffect(() => {
    setHeaderTitle(title);
  }, [title]);
  const renderMenuItem = (path, iconActive, iconInactive, label) => {
    const isActive = location.pathname === path;
    return (
      <li className={classNames({ active: isActive })}>
        <div
          onClick={() => {
            setIsOpenSidebar(!isOpenSidebar);
            setHeaderTitle(label);
          }}
        >
          <img src={isActive ? iconActive : iconInactive} alt={label} />
          <Link
            to={path}
            className={`text-decoration-none ${
              label === "Logout" && "text-color-red"
            }`}
          >
            {label}
          </Link>
        </div>
      </li>
    );
  };

  return (
    <div className="container-fluid px-0 px-md-1 ">
      <div>
        <div className="d-flex justify-content-between align-item-center mt-4">
          <div className="d-flex ">
            {isShowIcon && (
              <div className="me-3 mt-2 cursor-pointer">
                {" "}
                <img
                  src={openbaricon}
                  width={35}
                  height={35}
                  alt={"icon"}
                  onClick={() => {
                    console.log("Icon clicked");
                    setIsOpenSidebar(!isOpenSidebar);
                  }}
                />{" "}
              </div>
            )}
            <p className="fs-36 fw-500 d-none d-md-block">
              {headerTitle
                ? headerTitle === "Compliance"
                  ? "Compliance and Security"
                  : headerTitle
                : `Hello ${user?.name || "Guest"}! 👋`}
            </p>
          </div>
          <div className="d-flex justify-content-between align-item-center gap-2">
            <Profile />
          </div>
        </div>

        <div className="d-md-none d-block">
          <p className="fs-40 fw-500 mt-3">
            {headerTitle ? headerTitle : `Hello ${user?.name || "Guest"}! 👋`}
          </p>
        </div>
      </div>

      <Offcanvas
        isOpen={isOpenSidebar}
        toggle={() => setIsOpenSidebar(!isOpenSidebar)}
        direction="start"
      >
        <OffcanvasHeader
          className="border-bottom fs-16"
          toggle={() => setIsOpenSidebar(!isOpenSidebar)}
        >
          <div className="Brand">
            <img src={Icon} alt="icon" className="logo" />
            <h2 className="title">TRESORLY</h2>
          </div>
        </OffcanvasHeader>
        <OffcanvasBody>
          <div className={classNames("contentsContainer")}>
            <ul className="links_list">
              {renderMenuItem("/", dashboardActive, dashboard, "Dashboard")}
              {renderMenuItem("/users", profileActive, profile, "Users")}
              {renderMenuItem("/admins", profileActive, profile, "Admins")}
              {renderMenuItem(
                "/engagement-metrics",
                metricsActive,
                metrics,
                "Engagement Metrics"
              )}
              {renderMenuItem(
                "/support-queries",
                queriesActive,
                queries,
                "Support & Queries"
              )}
              {renderMenuItem(
                "/financial-overview",
                chartActive,
                chart,
                "Financial Overview"
              )}
              {renderMenuItem(
                "/operational-metrics",
                operationalActive,
                operational,
                "Operational Metrics"
              )}
              {renderMenuItem(
                "/compliance-security",
                complianceActive,
                compliance,
                "Compliance"
              )}
              {renderMenuItem("/", logout, logout, "Logout")}
            </ul>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default Header;
