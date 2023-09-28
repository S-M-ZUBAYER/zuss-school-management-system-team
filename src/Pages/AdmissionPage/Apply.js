import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Apply = () => {
    const [admissionData, setAdmissionData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to fetch admission data
                const response = await axios.get('https://zuss-school-management-system-server-site.vercel.app/api/admissionInfo', {
                    params: {
                        schoolCode: currentSchoolCode, // Replace with the school code you want to fetch data for
                    },
                });
                setAdmissionData(((response.data)[0])?.admissionInfo);
            } catch (error) {
                console.error('Error fetching admission data:', error);
            }
        };

        fetchData();
    }, []);



    const { schoolName, currentSchoolCode } = useContext(AuthContext);

    const [applicationId, setApplicationId] = useState(null);
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState("Student");
    const [allClasses, setAllClasses] = useState('');
    const [className, setClassName] = useState('');
    const [previousClass, setPreviousClass] = useState('');
    const [averageMark, setAverageMark] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState(admissionData?.applicationFee);
    const [transactionId, setTransactionId] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [address, setAddress] = useState('');
    const [agentName, setAgentName] = useState(null)
    const [gender, setGender] = useState(null)
    const [division, setDivision] = useState(null)
    const [district, setDistrict] = useState(null)



    const fetchClassInfo = async () => {
        try {
            const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
            const classInfoData = response.data?.classInfo;
            if (classInfoData) {
                const classNames = classInfoData?.map((element) => element?.name);
                setAllClasses(classNames);
            }
        } catch (error) {
            console.error('Error fetching classInfo:', error);
        }
    };

    useEffect(() => {
        fetchClassInfo();
    }, [currentSchoolCode]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date().getFullYear();
        if (!applicationId || !name || !designation || !gender || !fatherName || !motherName || !division || !district || !address || !className || !previousClass || !averageMark || !fatherName || !motherName || !phone || !email) {
            toast.error('Please fill in all fields');
            return;
        }
        // if (admissionData?.applicationFee) {
        //     if (!agentName || !number || !transactionId || !amount) {
        //         toast.error('Please fill the payment information');
        //         return;
        //     }
        // }


        try {
            // Make POST request to backend
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/application', {
                applicationId,
                date,
                name,
                designation,
                schoolName,
                schoolCode: currentSchoolCode,
                image,
                previousClass,
                averageMark,
                className,
                gender,
                fatherName,
                motherName,
                phone,
                email,
                division,
                district,
                extraInfo,
                address,
                accept: false,
                admitCard: false,
                waiting: false,
                number,
                transactionId,
                agentName,
                amount
            });
            // Clear form fields
            setApplicationId("");
            setName('');
            setDesignation('');
            setPhone('');
            setImage(null);
            setEmail('');
            setAddress('');
            setExtraInfo('');
            setPreviousClass("");
            setAverageMark("");
            setClassName("");
            setGender("");
            setDivision("");
            setDistrict("");
            setFatherName("");
            setMotherName("");
            setTransactionId("");
            setNumber("");
            setAddress("");
            setAgentName('');

            // Show success toast
            toast.success('Application successfully completed');
        } catch (error) {
            // Show error toast if request fails
            toast.error('Failed to complete your application');
        }
    };
    const handleFileUpload = useCallback(async (acceptedFiles) => {
        const apiKey = process.env.REACT_APP_imgbbKey;
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                formData
            );
            setImage(response.data.data.display_url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }, []);

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload([file]);
        }
    };

    const handleToGenerateId = () => {
        const currentDate = new Date();
        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
        const id = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${randomNumbers}`;
        setApplicationId(id);
    };


    return (
        <div className=" px-10 py-10 bg-gradient-to-l from-blue-900 via-slate-900 to-black">


            <div className=" px-10 py-10 border-2  ">
                <h1 className="text-3xl  font-bold text-lime-300 mb-8">Please Input Your Information Details Information To Apply</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label htmlFor="name" className="block font-semibold  text-gray-300">
                            Application Id:
                        </label>
                        <input
                            type="text"
                            id="application id"
                            placeholder='Click to generate application id'
                            value={applicationId}
                            onClick={handleToGenerateId}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="name" className="block font-semibold  text-gray-300">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Please Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="designation" className="block font-semibold  text-gray-300">
                            Designation:
                        </label>
                        <input
                            type="text"
                            id="designation"
                            placeholder='Please Enter Designation'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-gray-300 flex justify-between items-center">
                        <label htmlFor="email" className="block font-semibold text-gray-300">
                            Image :
                        </label>
                        <input className="w-5/6 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" onChange={handleInputChange} />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="name" className="block font-semibold  text-gray-300">
                            Previous Class:
                        </label>
                        <input
                            type="text"
                            id="previousClass"
                            placeholder='Please Your Previous Class'
                            value={previousClass}
                            onChange={(e) => setPreviousClass(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="name" className="block font-semibold  text-gray-300">
                            Average Mark:
                        </label>
                        <input
                            type="text"
                            id="averageMark"
                            placeholder='Please Enter Your Previous Class Average Mark'
                            value={averageMark}
                            onChange={(e) => setAverageMark(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="about" className="block font-semibold text-gray-300">
                            ClassName:
                        </label>
                        <select
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Please Select ClassName</option>
                            {allClasses && allClasses.map((classItem, index) => (
                                <option key={index} value={classItem}>
                                    {classItem}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between items-center text-white">
                        <label htmlFor="paymentMethod">Gender:</label>
                        <select className=" w-10/12 px-3 text-black py-2 rounded-lg" id="paymentMethod" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Your Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-center">
                        <label htmlFor="about" className="block font-semibold text-gray-300">
                            Father Name:
                        </label>
                        <input
                            id="fatherName"
                            value={fatherName}
                            placeholder='Please Enter Father Name'
                            onChange={(e) => setFatherName(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="about" className="block font-semibold text-gray-300">
                            Mother Name:
                        </label>
                        <input
                            id="motherName"
                            value={motherName}
                            placeholder='Please Enter Mother Name'
                            onChange={(e) => setMotherName(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="phone" className="block font-semibold text-gray-300">
                            Guardian Phone:
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder='Please Enter Phone No'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="email" className="block font-semibold text-gray-300">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder='Please Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="email" className="block font-semibold text-gray-300">
                            Division:
                        </label>
                        <input
                            type="text"
                            id="division"
                            placeholder='Please Enter Division'
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="email" className="block font-semibold text-gray-300">
                            District:
                        </label>
                        <input
                            type="text"
                            id="district"
                            placeholder='Please Enter District'
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <label htmlFor="address" className="block font-semibold text-gray-300">
                            Address:
                        </label>
                        <textarea
                            id="address"
                            value={address}
                            placeholder='Please Enter Your Full Address'
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <label htmlFor="address" className="block font-semibold text-gray-300">
                            Extra Information:
                        </label>
                        <textarea
                            id="extraInfo"
                            value={extraInfo}
                            placeholder='Please Enter Your Full Address'
                            onChange={(e) => setExtraInfo(e.target.value)}
                            className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {
                        admissionData?.applicationFee && <>
                            <div className="flex justify-between items-center text-white">
                                <label htmlFor="paymentMethod">Select Payment Method:</label>
                                <select className=" w-10/12 px-3 text-black py-2 rounded-lg" id="paymentMethod" value={agentName} onChange={(e) => setAgentName(e.target.value)}>
                                    <option value="">Select Your Payment Method</option>
                                    <option value="Bkash">Bkash</option>
                                    <option value="Nagad">Nagad</option>
                                    <option value="Upay">Upay</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="about" className="block font-semibold text-gray-300">
                                    Agent Number:
                                </label>
                                <input
                                    id="agentNumber"
                                    value={number}
                                    placeholder='Please Enter Agent Number'
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="about" className="block font-semibold text-gray-300">
                                    Application Fees:
                                </label>
                                <input
                                    id="applicationFee"
                                    value={amount}
                                    placeholder='Please Enter Amount'
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label htmlFor="about" className="block font-semibold text-gray-300">
                                    Transaction Id:
                                </label>
                                <input
                                    id="transaction"
                                    value={transactionId}
                                    placeholder='Please Enter Transaction Id'
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="w-10/12 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </>
                    }



                    <button
                        type="submit"
                        className="bg-green-500 w-full my-24 text-white py-2 px-8 rounded-md hover:bg-green-600"
                    >
                        Apply
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Apply;
