import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ data, feature, filter }) => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  // Function to process the data
  const getMonthlyUserData = (data, feature) => {
    const userData = {};

    data.forEach(item => {
      const month = new Date(item.Day).toLocaleString('default', { month: 'short' });
      const key = `${month} - ${item[feature]}`; // Group by selected feature (age or gender)

      userData[key] = (userData[key] || 0) + 1;
    });

    console.log('Processed User Data:', userData);
    return userData;
  };

  // Function to handle the filter change and update chart data
  const updateChartData = () => {
    if (!data || data.length === 0) return;

    // Get filtered data based on the feature
    const filteredData = getMonthlyUserData(data, feature);

    // Check if the filtered data is valid, if empty, handle appropriately
    if (Object.keys(filteredData).length === 0) {
      setChartData({
        series: [],
        categories: [],
      });
      return;
    }

    // Update the chart data with the processed user data
    const categories = Object.keys(filteredData);
    const seriesData = categories.map(category => filteredData[category]);

    setChartData({
      series: [
        {
          name: `Users by ${feature}`,
          data: seriesData,
        },
      ],
      categories,
    });
  };

  // Effect to update chart data when data or filter changes
  useEffect(() => {
    updateChartData();
  }, [data, feature, filter]); // Re-run when data, feature, or filter changes

  // If no data is available, show a message
  if (!chartData.series.length) {
    return <div>No data available for the selected filter.</div>;
  }

  const chartConfig = {
    series: chartData.series,
    chart: {
      type: 'line',
      height: 240,
      toolbar: {
        show: false,
      },
    },
    title: {
      show: '',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#020617'],
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: chartData.categories,
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
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
      padding: {
        top: 5,
        right: 20,
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
            Line Chart
          </h6>
          <p className="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            Visualize user data over time based on selected feature.
          </p>
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <ReactApexChart
          key={JSON.stringify(chartData)}  // Forces re-render of chart
          options={chartConfig}
          series={chartConfig.series}
          type="line"
          height={240}
        />
      </div>
    </div>
  );
};

export default LineChart;
