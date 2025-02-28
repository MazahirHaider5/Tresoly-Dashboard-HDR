import React,{useState} from 'react';
import '../assets/style/globals.css';
import '../assets/style/dashboard.css';
import { Dropdown } from "react-bootstrap";
import { Button, Card,   Table, } from "reactstrap"
import Pagination from "../components/Pagination";
import subscriptionIcon from '../assets/images/admin/subscriptionIcon.svg'
import cardIcon from '../assets/images/admin/cardIcon.svg'
import filterIcon from '../assets/images/admin/filterIcon.svg'
import previousIcon from '../assets/images/admin/previousArrow.svg'
import nextIcon from '../assets/images/admin/nextArrow.svg'
import dots from "../assets/images/dots.svg";
import refundIcon from "../assets/images/admin/refundIcon.svg";


const FinancialOverview = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const tableData = Array.from({ length: totalItems }, (_, i) => ({
    name: `John Smith`,
    email: `johnsmith${i + 1}@gmail.com`,
    userType: "Enterprise",
    date: "12/11/2024 07:23",
    package: "Yearly",
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
        <Dropdown.Item className="pb-0 " >
          <p className="fs-15 fw-600 refund-color  p-0 "><img src={refundIcon} alt="icon" className="me-1" /> Refund</p>
        </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
  );
  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-12 col-md-6 col-lg-4  mb-3 mb-xl-0'>
          <Card className='bg-white box-shadow-custom py-3'>
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={subscriptionIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0 '>Monthly Subscriptions</p>
                <p className='fs-25 fw-600 m-0'>202 </p>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-lg-4  mb-3 mb-xl-0'>
          <Card className='bg-white box-shadow-custom py-3'>
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={subscriptionIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0'>Down Time</p>
                <p className='fs-25 fw-600 m-0'>202 </p>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-lg-4  mb-3 mb-xl-0'>
          <Card
            className='bg-white box-shadow-custom py-3'
          >
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={cardIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0 '>Response Time </p>
                <p className='fs-25 fw-600 m-0'>202 </p>
              </div>
            </div>

          </Card>
        </div>
        
      </div>
      <div className='d-flex justify-content-between mt-3  mb-0'>
        <p className='fs-28 fw-500 mb-0 mt-2'>Transactions</p>
        <div className=' mt-2' >

          <Button
            type="button"
            className="fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-4  mb-lg-0 rounded-pill"
          >
            <img src={filterIcon} alt="icon" className="me-1" /> Filter
          </Button>
        </div>
      </div>
      <div className=" border rounded mt-3 mb-5">
        <Table responsive>
          <thead>
            <tr>
              <th className="table-head-bg text-nowrap ps-5 py-3">NAME</th>
              <th className="table-head-bg text-nowrap py-3">EMAIL</th>
              <th className="table-head-bg text-nowrap py-3">USER TYPE</th>
              <th className="table-head-bg text-nowrap py-3">PACKAGE</th>
              <th className="table-head-bg text-nowrap py-3">DATE</th>
              <th className="table-head-bg text-nowrap py-3">OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr className="text-nowrap" key={index}>
                <th scope="row" className="py-3 ps-5">
                  <p className="fs-16 fw-500">{user.name}</p>
                </th>
                <td className="fs-14 fw-500 py-3 tab-text-color">{user.email}</td>
               
                
                <td className={`fs-14 fw-500 py-3 tab-text-color ${ index %2 ? " dark-purple " :"text-success" }` }>{user.userType}</td>
                <td className="fs-14 fw-500 py-3 tab-text-color">{user.package}</td>
                <td className="fs-14 fw-500 py-3 tab-text-color">{user.date}</td>
               
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
    </div>
  );
};

export default FinancialOverview;
