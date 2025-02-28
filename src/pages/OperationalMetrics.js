import React, { useState } from 'react';
import '../assets/style/globals.css';
import '../assets/style/dashboard.css';
import { Button, Card, CardBody } from "reactstrap"
import iosIcon from '../assets/images/admin/ios.svg'
import androidIcon from '../assets/images/admin/android.svg'
import usersActiveIcon from '../assets/images/admin/usersActive.svg'
import filterIcon from '../assets/images/admin/filterIcon.svg'
import ReactApexChart from "react-apexcharts";

const OperationalMetrics = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Up Time",
        type: "area",
        data: [400, 425, 450, 460, 475, 495, 520, 535, 550, 575, 595, 600],
      },
      {
        name: "Down Time",
        type: "area",
        data: [100, 120, 140, 180, 200, 230, 280, 300, 325, 360, 380, 420],
      },

    ],
    options: {
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: false, 
        },
      },
      stroke: {
        curve: "smooth",
        width: 1.8,
      },
      fill: {
        type: "solid",
        opacity: [0.05, 0.01],
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      markers: {
        size: 0,
      },
      colors: ["#17508F", "#0077F2"],
      yaxis: [
        {
          title: {
            text: "Hours",
            style: {
              color: "#475467",
              fontSize: "14px",
              fontWeight: 550,
            },
          },
          min: 0,
          max: 1000,
          tickAmount: 5,
          labels: {
            style: {
              colors: "#475467",
            },
          },
        },
      ],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#475467",
          },
        },
        title: {
          text: "Months",
          style: {
            color: "#475467",
            fontSize: "14px",
            fontWeight: 550,
          },
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        markers: {
          size: 4,

        },
        labels: {
          useSeriesColors: false,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => (y !== undefined ? `${y.toFixed(0)} points` : y),
        },
      },
    },
  });
  return (
    <div className='container'>
      <div className='d-flex justify-content-between   mb-0'>
        <p className='fs-28 fw-500 mb-0 mt-2'>Overview</p>
        <div className=' mt-2' >
          <Button
            type="button"
            className="fw-500 fs-15 btn-fill-color border-1 border-white py-2 px-4  mb-lg-0 rounded-pill"
          // onClick={() => setIsAddUser(!isAddUser)}
          >
            <img src={filterIcon} alt="icon" className="me-1" /> Filter
          </Button>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0'>
          <Card className='bg-white box-shadow-custom py-2'>
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={usersActiveIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0 '>Up Time</p>
                <div className='d-flex justify-content-start gap-2 '>
                  <p className='fs-25 fw-600 m-0'>202 </p><spain className='fs-15 fw-300 text-color pt-2 mt-1'>hrs</spain>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0'>
          <Card className='bg-white box-shadow-custom py-2'>
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={usersActiveIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0'>Down Time</p>
                <div className='d-flex justify-content-start gap-2 '>
                  <p className='fs-25 fw-600 m-0'>2 </p><spain className='fs-15 fw-300 text-color pt-2 mt-1'>hrs</spain>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0'>
          <Card
            className='bg-white box-shadow-custom py-2'
          >
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={iosIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0 '>Response Time </p>
                <div className='d-flex justify-content-start gap-2 '>
                  <p className='fs-25 fw-600 m-0'>2.2 </p><spain className='fs-15 fw-300 text-color pt-2 mt-1'>sec</spain>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0'>
          <Card
            className='bg-white box-shadow-custom py-2'
          >
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={androidIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0  '>Load Time</p>
                <div className='d-flex justify-content-start gap-2 '>
                  <p className='fs-25 fw-600 m-0'>1.1 </p><spain className='fs-15 fw-300 text-color pt-2 mt-1'>sec</spain>

                </div>
              </div>
            </div>

          </Card>
        </div>
      </div>
      <div className='d-flex justify-content-between  mt-4 pt-3 mb-0'>
        <p className='fs-28 fw-500 '>Graphical Representation</p>
        <div className=' mt-2' >
          <select className="form-select w-auto text-color  text-start shadow-none" id="month-select">
            <option className='text-color fs-12'>Monthly</option>
          </select>
        </div>
      </div>
      <div className="row mt-3 mb-5">
        <div className="col-12 mb-2 mb-lg-0">
          <Card className="bg-white box-shadow-custom pe-4">
            <CardBody>
              <div className="chart-wrapper">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="line"
                  height={400}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperationalMetrics;
