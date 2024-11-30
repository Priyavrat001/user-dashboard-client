import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ data, onBarClick }) => {
  // Group data by month and gender/age (adjust as necessary)
  const getMonthlyUserCount = (data) => {
    const userCount = {};

    data.forEach(item => {
      const month = new Date(item.Day).toLocaleString('default', { month: 'short' });
      const key = `${month} - ${item.Gender}`;

      userCount[key] = (userCount[key] || 0) + 1; 
    });

    return userCount;
  };

  const userCountData = getMonthlyUserCount(data);
  const categories = Object.keys(userCountData);
  const seriesData = categories.map(category => userCountData[category]);

  // Apex chart configuration
  const chartConfig = {
    series: [
      {
        name: 'Users',
        data: seriesData,
      },
    ],
    chart: {
      type: 'bar',
      height: 400,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedCategory = categories[config.dataPointIndex];
          onBarClick(selectedCategory);
        },
      },
    },
    title: {
      text: 'Users per Month (Grouped by Gender)',
      align: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#020617'], // Bar color
    plotOptions: {
      bar: {
        columnWidth: '30%', // Reduced bar width to make them smaller
        borderRadius: 5, // Slightly rounded corners
      },
    },
    xaxis: {
      categories, // Use the categories for x-axis labels
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: 'User Count',
        style: {
          color: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      max: Math.max(...seriesData) * 1.2, // Dynamically set max value to prevent bars from being too large
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
        <div>
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
            Bar Chart
          </h6>
          <p className="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            Visualize user data per month with age or gender grouping.
          </p>
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <ReactApexChart
          options={chartConfig}
          series={chartConfig.series}
          type="bar"
          height={400} // Adjusted for better visibility
        />
      </div>
    </div>
  );
};

export default BarChart;
