import React, { useState } from "react";
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
import calendar from '../assets/images/calendar.svg'
import { Link } from "react-router-dom";
import previousIcon from '../assets/images/admin/previousArrow.svg'
import nextIcon from '../assets/images/admin/nextArrow.svg'
import activeIcon from '../assets/images/admin/activeIcon.svg'
import inActiveIcon from '../assets/images/admin/inactiveIcon.svg'
import Pagination from "../components/Pagination";
import searchIcon from '../assets/images/admin/searchIcon.svg'
import filterIcon from '../assets/images/admin/filterIcon.svg'
const Subscriptions = () => {

  const [isAddUser, setIsAddUser] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showDurationDate, setShowDurationDate] = useState(false);
  const [durationDate, setDurationDate] = useState(new Date())

  const itemsPerPage = 10;
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [plans, setPlans] = useState([
    { value: "1", label: "plan-01" },
    { value: "2", label: "plan-02" },
    { value: "3", label: "plan-03" },
    { value: "4", label: "plan-04" }
  ]);

  const tableData = Array.from({ length: totalItems }, (_, i) => ({
    email: `johnsmith${i + 1}@gmail.com`,
    cost: "39.99CHF",
    duration: "Monthly",
    renewalDate: "12/11/2024 07:23",
    userType:"Enterprise",

  }));

  const currentData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const DropdownMenu = () => (
    <Dropdown className="bg-white" align="end" offset={[-140, 0]}>
      <Dropdown.Toggle className="border-0 bg-white dropdown-arrow-hidden">
        <img src={dots} alt="Options" width={20} height={20} />
      </Dropdown.Toggle>
      <Dropdown.Menu >
        <Dropdown.Item className="pb-0" >
          <p className="fs-14 fw-500  text-center pt-1 pb-0 "> Refund amount </p>
        </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
  );

  const handleDurationDate = (selectedDate) => {
    setDurationDate(selectedDate);
    setShowDurationDate(false); // Close the calendar after selection
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between gap-2 flex-wrap ">
        <div>
          <p className="text-color fs-25 fw-500 p-0 m-0">Subscribers : 440</p>
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
                  className="search-input search-input-height form-control fw-400  ps-5 text-muted border-0 rounded-4 "
                  placeholder="Search"
                />
              </div>
            </FormGroup>
          </div>

          <div>
            <Button
              type="button"
              className="fw-500 fs-15 btn-fill-color border-1 border-white py-3 px-5 mb-3 mb-lg-0 rounded-pill"
              // onClick={() => setIsAddUser(!isAddUser)}
            >
              <img src={filterIcon} alt="icon" className="me-1" /> Filter
            </Button>
          </div>

        </div>
      </div>

      <div className=" border rounded">
        <Table responsive>
          <thead>
            <tr>
              <th className="table-head-bg text-nowrap ps-5 py-3">Name</th>
              <th className="table-head-bg text-nowrap py-3">Email</th>
              <th className="table-head-bg text-nowrap py-3">Signup</th>
              <th className="table-head-bg text-nowrap py-3">Last Login</th>
              <th className="table-head-bg text-nowrap py-3">User Type</th>
              <th className="table-head-bg text-nowrap py-3">Options</th>
            </tr>
          </thead>
          <tbody>
          




            {currentData.map((subscription, index) => (
              <tr className="text-nowrap" key={index}>
                <th scope="row" className="py-3 ps-5">
                  <p className="fs-16 fw-500">{subscription.email}</p>
                </th>
                <td className="fs-14 fw-500 py-3 tab-text-color">{subscription.cost}</td>
                <td className="fs-14 fw-500 py-3 tab-text-color">{subscription.duration}</td>
                <td className="fs-14 fw-500 py-3 tab-text-color">{subscription.renewalDate}</td>
                <td className={`fs-14 fw-500 py-3 tab-text-color dark-purple`}>{subscription.userType}</td>
                <td className="text-start">{DropdownMenu()}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center px-3 py-2 p-md-3">
          <div className="d-none d-md-block">
            <Button outline className="btn-outline-color-pagination" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <img src={previousIcon} alt="icon" width={20} /> Previous
            </Button>
          </div>
          <div className="d-block d-md-none">
            <img src={previousIcon} alt="icon" width={20} onClick={() => currentPage !== 1 && (setCurrentPage(currentPage - 1))} className="cursor-pointer" />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <div className="d-none d-md-block">
            <Button outline className="btn-outline-color-pagination" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next <img src={nextIcon} alt="icon" width={20} />
            </Button>
          </div>
          <div className="d-block d-md-none">
            <img src={nextIcon} alt="icon" width={20} onClick={() => { currentPage !== totalPages && (setCurrentPage(currentPage + 1)) }} className="cursor-pointer" />
          </div>

        </div>
      </div>
      <Modal isOpen={isAddUser} toggle={() => setIsAddUser(!isAddUser)}>
        <ModalHeader toggle={() => setIsAddUser(!isAddUser)} className='border-0'></ModalHeader>
        <ModalBody>
          <h2 className='fs-20 fw-600 text-center mt-0'> Add User</h2>
          <Form>
            <FormGroup>
              <Label for="email" className='fs-14 fw-500'>Email</Label>
              <Input id="email" name="email" placeholder="Enter Email" type="email" />
            </FormGroup>
            <FormGroup>
              <Label for="plan" className='fs-14 fw-500'>plan</Label>
              <Select
                options={plans}
                placeholder="Select Plan"
                value={selectedPlan}
                isSearchable={true}
                onChange={(selected) => {
                  setSelectedPlan(selected);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="durationDate" className='fs-14 fw-500'>
                Duration
              </Label>
              <div className="d-flex align-items-center border rounded pe-1 cursor-pointer">
                <Input
                  type="text"
                  id="durationDate"
                  value={durationDate.toLocaleDateString()}
                  readOnly
                  className='border-0 cursor-pointer'
                  onClick={() => setShowDurationDate(!showDurationDate)}
                />
                <img src={calendar} alt='icon' onClick={() => setShowDurationDate(!showDurationDate)} />
              </div>
              <div className="position-relative">
                {showDurationDate && (
                  <div className="position-absolute bg-white shadow rounded" style={{ zIndex: 1000 }}>
                    <Calendar
                      onChange={handleDurationDate}
                      value={durationDate}
                      // maxDate={new Date()}
                      className="shadow-none border-0 outline-0 fs-16 mt-2 py-1 ps-0 fw-500 cursor-pointer my-3"
                      formatShortWeekday={(locale, date) =>
                        ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
                      }
                      calendarClassName="custom-calendar"
                    />
                  </div>
                )}
              </div>
            </FormGroup>
            <FormGroup className='text-center'>
              <Button type='button' className='fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-5 text-center' onClick={() => setIsAddUser(!isAddUser)}>Send Link</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Subscriptions;
