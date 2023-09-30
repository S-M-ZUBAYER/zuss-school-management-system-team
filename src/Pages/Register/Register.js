import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/UserContext';
import { useEffect } from 'react';
import axios from 'axios';
import BtnSpinner from '../Shared/Spinners/BtnSpinner';




const Register = () => {
    const { createUser, currentSchoolCode, setCurrentSchoolCode, schoolName, setSchoolName, updateUserProfile, loading, setLoading } = useContext(AuthContext);
    const [matchError, setMatchError] = useState(null);
    const [lengthError, setLengthError] = useState(null);

    const [fileError, setFileError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [schools, setSchools] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    useEffect(() => {
        const fetchSchools = async () => {
            try {
                // Send a GET request to retrieve all schools
                const response = await axios.get('https://zuss-school-management-system-server-site.vercel.app/api/schools');
                setSchools(response.data);
                console.log(response?.data)
            } catch (error) {
                console.error(error);
                // Handle the error as needed
            }
        };

        fetchSchools();
    }, []);


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const name = event.target.name.value;
    //     const image = event.target.image.files[0];
    //     const email = event.target.email.value;
    //     const password = event.target.password.value;
    //     const confirmPassword = event.target.confirmPassword.value;
    //     setLoading(true);
    //     console.log(schoolName, currentSchoolCode, name, image, email, password, confirmPassword);
    //     if (password.length < 6) {
    //         setLengthError("Your Password have to minimum 6 characters");

    //         return;
    //     }

    //     if (password !== confirmPassword) {
    //         setMatchError("Your Password did not match");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('image', image);


    //     console.log(process.env.REACT_APP_imgbbKey)

    //     const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`;
    //     fetch(url, {
    //         method: "POST",
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(imgData => {
    //             createUser(email, password)
    //                 .then(result => {
    //                     // updateUserProfile(name, imgData.data.display_url)
    //                     // .then(() => {
    //                     console.log(result)
    //                     // setAuthToken(result.user, accountType)
    //                     toast.success('Registration Completed successfully...');
    //                     navigate('/:name/intro/notice')
    //                     setLoading(false)
    //                     // })
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                     toast.error(err)
    //                 });
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             toast.error(err);
    //         });
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const name = event.target.name.value;
        const image = event.target.image.files[0];
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        console.log(schoolName, currentSchoolCode, name, image, email, password, confirmPassword);
        if (password.length < 6) {
            setLengthError("Your Password has to be a minimum of 6 characters");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMatchError("Your Passwords do not match");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`;

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                createUser(email, password)
                    .then(result => {
                        const schoolUser = {
                            name: name,
                            image: imgData.data.display_url,
                            schoolName: schoolName,
                            schoolCode: currentSchoolCode,
                            email: email
                        };

                        // Sending the POST request to https://zuss-school-management-system-server-site.vercel.app/api/schoolUser/
                        axios.post('https://zuss-school-management-system-server-site.vercel.app/api/schoolUser/admin/add', schoolUser)
                            .then(response => {
                                toast.success('Registration Completed successfully...');
                                setLoading(false);
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message); // Display the error message using toast.error
                                setLoading(false);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.message); // Display the error message using toast.error
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message); // Display the error message using toast.error
                setLoading(false);
            });
    };




    return (
        <div className='flex justify-center items-center py-8 drop-shadow-2xl bg-gradient-to-l from-blue-900 via-slate-900 to-black '>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Signup</h1>
                    <p className='text-sm text-gray-400'>Create a new account</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-12 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div className="form-control">
                            {/* <div>
                                <label htmlFor='id' className='block mb-2 text-sm text-left'>
                                    School ID
                                </label>
                                <select id="mySelectId" className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' value={selectedId} onChange={handleIdChange}>
                                    <option value="">-- Select --</option>
                                    {
                                        allSchoolId.map(element => <option value={element}>{element}</option>)
                                    }


                                </select>
                            </div> */}
                        </div>
                        {/* <div>
                            <label htmlFor='SchoolName' className='block mb-2 text-sm text-left'>
                                School Name:
                            </label>
                            <select id="mySelect" className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' value={selectedOption} onChange={handleChange}>
                                <option value="">-- Select --</option>
                                {
                                    allSchools.map(element => <option value={element}>{element}</option>)
                                }


                            </select>
                        </div> */}

                        <div>
                            <label htmlFor='schoolName' className='block mb-2 text-sm text-left'>
                                School Name
                            </label>
                            <select
                                name='schoolName'
                                id='mySelect'
                                required
                                value={schoolName}
                                onChange={(e) => setSchoolName(e.target.value)}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            >
                                <option value=''>Select a School Name</option>
                                {schools.map((school) => (
                                    <option key={school.name} value={school.name}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='schoolId' className='block mb-2 text-sm text-left'>
                                SC
                            </label>
                            <input
                                type='text'
                                id='schoolId'
                                name='schoolId'
                                value={currentSchoolCode}
                                onChange={(e) => setCurrentSchoolCode(e.target.value)}
                                placeholder='Enter SC'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                required
                            />
                        </div>




                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm text-left'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm text-left'>
                                Select Image:
                            </label>
                            <input
                                type='file'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                id='image'
                                name='image'
                                accept='image/*'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm text-left'>
                                Email address
                            </label>
                            <input
                                required
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='password' className='text-sm text-left' >
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='password' className='text-sm text-left' >
                                    Confirm Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-green-500 text-gray-900'
                            />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div>
                            <button
                                type='submit'
                                className='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100 bg-gradient-to-r from-purple-400 to-pink-600'
                            >
                                {loading ? <BtnSpinner></BtnSpinner> : 'Sign Up'}

                            </button>
                        </div>
                    </div>
                </form>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account yet?{' '}
                    <Link to='/login' className='hover:underline text-gray-600'>
                        Sign In
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Register;

