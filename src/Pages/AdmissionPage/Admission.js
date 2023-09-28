
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import DisplaySpinner from '../Shared/Spinners/DisplaySpinner';

const Admission = () => {
    const [admissionData, setAdmissionData] = useState([]);

    const { currentSchoolCode, schoolName } = useContext(AuthContext);
    const [numbers, setNumbers] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Make a GET request to fetch admission data
                const response = await axios.get('https://zuss-school-management-system-server-site.vercel.app/api/admissionInfo', {
                    params: {
                        schoolCode: currentSchoolCode, // Replace with the school code you want to fetch data for
                    },
                });
                setAdmissionData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admission data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentSchoolCode]);

    useEffect(() => {
        const fetchPaymentNumbers = async () => {
            try {
                // Send a GET request to retrieve payment numbers for the school
                const response = await axios.get(
                    `https://zuss-school-management-system-server-site.vercel.app/api/PaymentNumbers/${currentSchoolCode}`
                );
                setNumbers((response.data[0].numbers[0]));
            } catch (error) {
                console.error(error);
                // Handle the error as needed
            }
        };

        fetchPaymentNumbers();
    }, [currentSchoolCode]);


    if (loading) {
        return <DisplaySpinner></DisplaySpinner>
    }

    return (
        <div className="p-4 bg-gradient-to-l from-blue-900 via-slate-900 to-black text-slate-100 lg:px-24">
            {admissionData.map((data, index) => (
                <div key={index}>
                    <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">Admission Notice</h1>
                    <p className="text-start">{(data.admissionInfo).admissionNotice}</p>
                    <h2 className=" text-3xl font-bold mt-10 mb-4 bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">Requirements</h2>
                    <ul className="text-start">
                        {(data.admissionInfo).requirement.map((term, i) => (
                            <li key={i}>{`${i + 1}. ${term}`}</li>
                        ))}
                    </ul>
                    <h2 className="text-3xl font-bold mt-10 mb-4 bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">Fee Type:</h2>
                    <p>{data.feeType}</p>
                    {(data.admissionInfo).feeType === 'applicationFee' && (
                        <div>
                            <h2>Application Fee: <span>{(data.admissionInfo).applicationFee} Taka</span></h2>
                            <h1 className="text-3xl font-bold mt-10 mb-4 bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">Available Payment</h1>
                            {
                                numbers && Object.keys(numbers).length !== 0 && <>
                                    <p className="pt-2  text-lg"><span className="text-green-400">Bkash:</span>  {numbers.bkash}</p>
                                    <p className="pt-2 text-lg"><span className="text-green-400">Nagad:</span> {numbers.nagad}</p>
                                    <p className="pt-2 text-lg mb-12"><span className="text-green-400">Upay:</span> {numbers.upay}</p>

                                </>
                            }
                        </div>
                    )}
                    {(data.admissionInfo).feeType !== 'applicationFee' && (
                        <div>
                            <h2>Application Fee :  No Need To Pay To Apply </h2>

                        </div>
                    )}

                </div>
            ))}
            <Link to={`/${schoolName}/admission/apply`}>
                <button className="px-4 py-2 mt-8 bg-blue-500 text-white rounded-md">Apply Now</button>
            </Link>

        </div>
    );
};

export default Admission;




