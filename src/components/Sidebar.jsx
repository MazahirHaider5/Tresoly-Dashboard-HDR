import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import '../assets/style/sidebar.scss';
import Icon from '../assets/images/sidebar/admin/logo.svg';
import sidebarClose from '../assets/images/sidebar/admin/sidebarClose.svg';
import sidebarOpen from '../assets/images/sidebar/admin/sidebarOpen.svg';
import logout from '../assets/images/sidebar/admin/logout.svg';
import chart from '../assets/images/sidebar/admin/chart.svg';
import chartActive from '../assets/images/sidebar/admin/chartActive.svg';
import compliance from '../assets/images/sidebar/admin/compliance.svg';
import complianceActive from '../assets/images/sidebar/admin/complianceActive.svg';
import dashboard from '../assets/images/sidebar/admin/dashboard.svg';
import dashboardActive from '../assets/images/sidebar/admin/dashboardActive.svg';
import operational from '../assets/images/sidebar/admin/operational.svg';
import operationalActive from '../assets/images/sidebar/admin/operationalActive.svg';
import profile from '../assets/images/sidebar/admin/profile.svg'
import profileActive from '../assets/images/sidebar/admin/profileActive.svg';
import queries from '../assets/images/sidebar/admin/queries.svg';
import queriesActive from '../assets/images/sidebar/admin/queriesActive.svg';
import subscription from '../assets/images/sidebar/admin/subscription.svg';
import subscriptionActive from '../assets/images/sidebar/admin/subscriptionActive.svg';
import metrics from '../assets/images/sidebar/admin/metrics.svg';
import metricsActive from '../assets/images/sidebar/admin/metricsActive.svg';

const Sidebar = ({ isCloseSidebar, getTitle }) => {

    const location = useLocation();  // Get the current location (pathname)
    const [closeMenu, setCloseMenu] = useState(false);
    const handleCloseMenu = () => {
        const newState = !closeMenu;
        setCloseMenu(newState);
        if (isCloseSidebar) {
            isCloseSidebar(newState);
        }
    };
    const renderMenuItem = (path, iconActive, iconInactive, label) => {
        const isActive = location.pathname === path;
        return (
            <li className={classNames({ active: isActive })} >
                <Link to={path} onClick={() => getTitle(label)}>
                    <img src={isActive ? iconActive : iconInactive} alt={label} />
                </Link>
                <Link to={path} className={`text-decoration-none sidebar-text fs-17 fw-400 ${label === "Logout" && "text-color-red"}`} onClick={() => getTitle(label)}>
                    {label}
                </Link>
            </li>
        );
    };
    useEffect(() => {
        const handleResize = () => {
            setCloseMenu(window.innerWidth <= 991);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            {/* <div className={` cursor-pointer sidebar-toggleIcon text-end`} onClick={handleCloseMenu}>
                <img src={closeMenu ? sidebarOpen : sidebarClose} width={40} height={40} alt={closeMenu ? "open" : "close"} />
            </div> */}

            <div className={classNames("sidebar border", { active: closeMenu })}>
                <div className={classNames("logoContainer mt-5", { active: closeMenu })}>
                    <img src={Icon} alt="icon" className="logo" width={100} height={100} />
                    <h2 className="title ">TRESORLY</h2>
                </div>
                <div className={classNames("contentsContainer", { active: closeMenu })}>
                    <ul>
                    {!closeMenu && <p className="ms-1 mb-2  fw-500 text-color fs-18 ">Overview</p>}
                        {renderMenuItem("/", dashboardActive, dashboard, "Dashboard")}
                        <hr className="w-100 " />
                        {!closeMenu && <p className="ms-1 my-2  fw-500 text-color fs-18 ">User Management</p>}
                        {renderMenuItem("/users", profileActive, profile, "Users")}
                        {renderMenuItem("/admins", profileActive, profile, "Admins")}
                        {renderMenuItem("/engagement-metrics", metricsActive, metrics, "Engagement Metrics")}
                        {renderMenuItem("/support-queries", queriesActive, queries, "Support & Queries")}
                        <hr className="w-100 " />
                        {!closeMenu && <p className="ms-1 my-2  fw-500 text-color fs-18 ">Financial Status</p>}
                        {renderMenuItem("/financial-overview", chartActive, chart, "Financial Overview")}
                        {/* {renderMenuItem("/operational-metrics", operationalActive, operational, "Operational Metrics")} */}
                        <hr className="w-100 " />
                        {!closeMenu && <p className="ms-1 my-2  fw-500 text-color fs-18 ">Security</p>}
                        {renderMenuItem("/compliance-security", complianceActive, compliance, "Compliance")}
                        <hr className="w-100 " />
                        {renderMenuItem("/", logout, logout, "Logout")}
                    </ul>
                </div>
            </div>
        </>

    );
};

export default Sidebar;


