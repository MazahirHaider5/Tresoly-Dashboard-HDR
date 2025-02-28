import React, { useState, useEffect } from 'react';
import '../assets/style/globals.css';
import '../assets/style/dashboard.css';
import { Card, CardBody } from "reactstrap"
import totalTicketsIcon from '../assets/images/admin/totalTicket.svg'
import totalUsers from '../assets/images/admin/usersActive.svg'
import subscription from '../assets/images/admin/subscriptionIcon.svg'
import ReactApexChart from "react-apexcharts";
import {  Bar, } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, BarElement, ArcElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Dashboard = () => {

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Data',
        data: [700, 1000, 600, 850, 650, 700, 800, 1000, 600, 700, 600, 500],
        backgroundColor: '#17508F',
        borderRadius: 5,
        barPercentage: 0.8,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 14,
            weight: 500,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Installations',
          font: {
            size: 14,
            weight: 500,
          },
        },
        ticks: {
          stepSize: 200,
          callback: function (value) {
            return value;
          },
        },
        suggestedMin: 0,
        suggestedMax: 1000,
        grid: {
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
        },
        beginAtZero: true,
      },
    },
  };
  const radialBarOptions = {
    series: [67, 83],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
        width: '100%',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
              show: false, // Hide the percentage by default
            },
            total: {
              show: true,
              label: '1,000',
              fontSize: 19,
              formatter: function () {
                return '1000'; // Show "1000" always
              }
            }
          }
        }
      },
      labels: ['Active Users', 'Inactive Users'],
      colors: ['#17508F', '#168DBC'],
      legend: {
        show: true,
        position: "bottom",
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 5,
          height: 5,
          radius: 5,
        },
        itemMargin: {
          horizontal: 5,
          vertical: 5,
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          color: '#ffffff', // White text color
        },
        theme: 'dark', // Dark background for better contrast with white text
        y: {
          formatter: function (val) {
            return `${val}%`; // Show percentage on hover
          },
        },
      },
    },
  };
  const [state, setState] = useState({
    series: [
      {
        name: "Total Revenue",
        type: "area",
        data: [100, 120, 140, 180, 200, 230, 280, 300, 325, 360, 380, 420],
      },
      {
        name: "Monthly Subscription",
        type: "area",
        data: [400, 425, 450, 460, 475, 495, 520, 535, 550, 575, 595, 600],
      },
      {
        name: "Yearly Subscription",
        type: "area",
        data: [600, 625, 650, 700, 725, 775, 700, 725, 750, 800, 850, 820],
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
        opacity: [0.01, 0.01, 0.05],
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
      colors: ["#17508F", "#168DBC", "#0077F2"],
      yaxis: [
        {
          title: {
            text: "Revenue",
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

      <div className='row  mt-md-3'>
        <div className='col-12 col-lg-4 mb-3 mb-lg-0'>
          <div className='row '>
            <div className='col'>
              <Card className='bg-white box-shadow-custom py-3 '>
                <div className='d-flex justify-content-start align-items-center'>
                  <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                    <img src={subscription} alt='icon' width={43} height={43} />
                  </div>
                  <div className=''>
                    <p className='text-color fs-14 fw-500 mb-0 '>Total Revenue</p>
                    <p className='fs-30 fw-500 m-0'>220K </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col'>
              <Card className='bg-white box-shadow-custom py-3'>
                <div className='d-flex justify-content-start align-items-center'>
                  <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                    <img src={totalUsers} alt='icon' width={43} height={43} />
                  </div>
                  <div className=''>
                    <p className='text-color fs-14 fw-500 mb-0 '>Subscribers</p>
                    <p className='fs-30 fw-500 m-0'>220 </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col'>
              <Card className='bg-white box-shadow-custom py-3'>
                <div className='d-flex justify-content-start align-items-center'>
                  <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                    <img src={totalTicketsIcon} alt='icon' width={43} height={43} />
                  </div>
                  <div className=''>
                    <p className='text-color fs-14 fw-500 mb-0 '>Active Tickets</p>
                    <p className='fs-30 fw-500 m-0'>220 </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
        <div className='col-12  col-lg-8 mb-2 mb-lg-0'>
          <Card className='bg-white box-shadow-custom'>
            <CardBody>
              <div className="chart-wrapper">
                <div className="chart-container">
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="line"
                    height={400}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row mt-3 mb-5">
        <div className="col-12 col-xl-7 col-lg-12 mb-3 mb-xl-0">
          <Card className="bg-white box-shadow-custom h-100">
            <CardBody>
              <div className="chart-wrapper">
                <div
                  className="chart-container"
                  style={{
                    height: '300px',
                    width: '100%',
                  }}
                >
                  <Bar
                    data={barData}
                    options={barOptions}
                    height={49}
                    width="100%"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-xl-5 col-lg-12 mb-3 mb-xl-0">
          <Card className="bg-white box-shadow-custom h-100">
            <CardBody>
              <div
                className="chart-wrapper d-flex justify-content-center align-items-center"
                style={{
                  height: '300px', 
                  width: '100%',
                  overflow: 'hidden', 
                }}
              >
                <ReactApexChart
                  options={radialBarOptions.options}
                  series={radialBarOptions.series}
                  type="radialBar"
                  height="100%"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
