import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { server } from '../config/server';
import BarChart from '../components/BarChart';
import LineChart from "../components/LineChart"
import DateRangePicker from "../components/DateRangePicker";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ageGroup, setAgeGroup] = useState('');
    const [gender, setGender] = useState('');
    const [selectedFeature, setSelectedFeature] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const savedAgeGroup = Cookies.get('ageGroup');
        const savedGender = Cookies.get('gender');
        const savedStartDate = Cookies.get('startDate');
        const savedEndDate = Cookies.get('endDate');

        if (savedAgeGroup) setAgeGroup(savedAgeGroup);
        if (savedGender) setGender(savedGender);
        if (savedStartDate) setStartDate(new Date(savedStartDate));
        if (savedEndDate) setEndDate(new Date(savedEndDate));

        fetchData();
    }, []);

    useEffect(() => {
        filterData();

        Cookies.set('ageGroup', ageGroup);
        Cookies.set('gender', gender);
        if (startDate) Cookies.set('startDate', startDate.toISOString());
        if (endDate) Cookies.set('endDate', endDate.toISOString());
    }, [ageGroup, gender, startDate, endDate, data]);

    const fetchData = async () => {
        const response = await axios.get(`${server}/api/v1/data`, { withCredentials: true });
        const responseData = response?.data;

        setData(responseData.filteredData);
        setFilteredData(responseData.filteredData); // Initially show all data
    };

    const filterData = () => {
        let filtered = data;

        if (ageGroup) {
            filtered = filtered.filter(item => item.Age === ageGroup);
        }

        if (gender) {
            filtered = filtered.filter(item => item.Gender === gender);
        }

        if (startDate && endDate) {
            filtered = filtered.filter(item => {
                const [day, month, year] = item.Day.split('/');
                const itemDate = new Date(`${year}-${month}-${day}`);

                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        setFilteredData(filtered);
    };

    const handleBarClick = (feature) => {
        setSelectedFeature(feature);
    };

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        filterData();
    };

    const resetPreferences = () => {
        setAgeGroup('');
        setGender('');
        setStartDate(null);
        setEndDate(null);

        Cookies.remove('ageGroup');
        Cookies.remove('gender');
        Cookies.remove('startDate');
        Cookies.remove('endDate');

        filterData();
    };

    const handleLogout = async () => {
        const response = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
        if (response?.data.success) {
            toast.success("Logout Successfully");
            navigate("/login");
        }
    };

    const generateShareableLink = () => {
        const params = new URLSearchParams({
            ageGroup,
            gender,
            startDate: startDate ? startDate.toISOString() : '',
            endDate: endDate ? endDate.toISOString() : ''
        });

        const shareableLink = `${window.location.origin}/?${params.toString()}`;
        navigator.clipboard.writeText(shareableLink);
        toast.success("Link copied to clipboard!");
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        const ageGroupParam = queryParams.get('ageGroup');
        const genderParam = queryParams.get('gender');
        const startDateParam = queryParams.get('startDate');
        const endDateParam = queryParams.get('endDate');

        if (ageGroupParam) setAgeGroup(ageGroupParam);
        if (genderParam) setGender(genderParam);
        if (startDateParam) setStartDate(new Date(startDateParam));
        if (endDateParam) setEndDate(new Date(endDateParam));

        fetchData();
    }, [window.location.search]);

    return (
        <>
            <div className='flex justify-between items-center p-4'>
                <h1 className="text-2xl font-bold">User Analytics Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={resetPreferences}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Reset Filters
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-gray-500 hover:text-gray-700"
                    >
                        <MdLogout className="text-xl" />
                    </button>
                </div>
            </div>
            <hr />
            <div className="flex flex-col md:flex-row p-4 gap-8 justify-center items-center min-h-screen">
                <div className="w-full md:w-1/4"> {/* Full width on mobile, 1/4 on medium screens and above */}
                    <DateRangePicker onDateChange={handleDateChange} />
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age Group:</label>
                            <select
                                value={ageGroup}
                                onChange={e => setAgeGroup(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">All</option>
                                <option value="15-25">15-25</option>
                                <option value=">25">25</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender:</label>
                            <select
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">All</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/4"> {/* Full width on mobile, 3/4 on medium screens and above */}
                    <div className="mb-8">
                        <BarChart data={filteredData} onBarClick={handleBarClick} />
                    </div>

                    {selectedFeature && (
                        <div className="mb-8">
                            <LineChart data={filteredData} feature={selectedFeature} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-4 p-4">
                <button
                    onClick={generateShareableLink}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Share Chart
                </button>
            </div>
        </>
    );
};

export default Dashboard;
