import React,{useEffect, useState} from 'react';
import '../assets/style/globals.css';
import '../assets/style/dashboard.css';
import { Card, CardBody } from "reactstrap"
import iosIcon from '../assets/images/admin/ios.svg'
import androidIcon from '../assets/images/admin/android.svg'
import usersActiveIcon from '../assets/images/admin/usersActive.svg'
import ReactApexChart from "react-apexcharts";
import axiosInstance from '../services/Interceptor';

const EngagementMetrics = () => {
  
  const [state, setState] = useState({
    series: [
      {
        name: "Users",
        type: "area",
        data: [100, 120, 140, 180, 200, 230, 280, 300, 325, 360, 380, 420],
      },
      {
        name: "Android",
        type: "area",
        data: [400, 425, 450, 460, 475, 495, 520, 535, 550, 575, 595, 600],
      },
      {
        name: "iOS",
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
            text: "Numbers",
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

  const [info, setInfo] = useState({
    activeUsers: 0,
    inactiveUsers: 0,
  });

  const [timeFrame, setTimeFrame] = useState('Monthly');
  
  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/admin/getInfoAboutUsers");
      console.log("active and inactive users in EngagementMatrix :::::::::" , response);
      if (response.data.success) {
        setInfo(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  const fetchChartData = async (timeFrame) => {
    try {
      const response = await axiosInstance.get(`/admin/getDataOnTimeFrame?timeFrame=${timeFrame}`);
      if (response.data && response.data[timeFrame]) {
        const data = response.data[timeFrame];
        setState((prevState) => ({
          ...prevState,
          series: data.series || prevState.series,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: data.categories || prevState.options.xaxis.categories,
            },
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching chart data", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchChartData(timeFrame);
  }, [timeFrame]);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };
  
  return (
    <div className='container'>
      <p className='fs-25 fw-500'>Overview</p>
      <div className='row mt-4'>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0'>
          <Card className='bg-white box-shadow-custom'>
            <div className='d-flex justify-content-start align-items-center'>
              <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={usersActiveIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0 '>Active Users</p>
                <p className=' fs-25 fw-600 m-0'>{info.activeUsers}</p>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3 mb-xl-0'>
          <Card className='bg-white box-shadow-custom'>
            <div className='d-flex justify-content-start align-items-center'>
            <div className='rounded-circle-number bg-light-purple dark-purple ms-4 me-3 my-3'>
                <img src={usersActiveIcon} alt='icon' width={43} height={43} />
              </div>
              <div className=''>
                <p className='text-color fs-14 fw-500 mb-0'>Inactive Users</p>
                <p className='fs-25 fw-600 m-0'>{info.inactiveUsers}</p>
              </div>
            </div>
          </Card>
        </div>
       
      </div>
      <div className='d-flex justify-content-between  mt-4 pt-3 mb-0'>
      <p className='fs-25 fw-500 '>Graphical Representation</p>
      <div className=' mt-2' >
          <select 
            className="form-select w-auto text-color ps-3 pe-5 text-start shadow-none" 
            id="month-select"
            value={timeFrame}
            onChange={handleTimeFrameChange}
          >
            <option value='Monthly' className='text-color fs-12'>Monthly</option>
            <option value='Weekly' className='text-color fs-12'>Weekly</option>
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

export default EngagementMetrics;
