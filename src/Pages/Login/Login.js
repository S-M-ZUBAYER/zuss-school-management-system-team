import React, { useContext, useEffect, useState } from 'react'
// import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import BtnSpinner from '../Shared/Spinners/BtnSpinner';


const LogIn = () => {
    const [userEmail, setUserEmail] = useState('');
    const { schoolName, setSchoolName, currentSchoolCode, setCurrentSchoolCode } = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    const [currentUser, setCurrentUser] = useState({});

    const { signIn, loading, setLoading, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || `/${schoolName}`;

    useEffect(() => {
        // Define the API URL
        const apiUrl = `https://zuss-school-management-system-server-site.vercel.app/api/schoolUser/${currentUser}`;

        // Make the GET request using axios
        axios
            .get(apiUrl)
            .then((response) => {
                // Set the response data in state
                setCurrentUser(response.data);
            })
            .catch((error) => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }, [currentUser]);

    console.log(currentUser, "email")

    const handleToEmail = (event) => {
        // Assuming you have an input field with the name "email"
        setCurrentUser(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (currentUser?.mainAdmin === true) {
            console.log(email, password)
            signIn(email, password)
                .then(result => {
                    axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/schoolUser/${email}`)
                        .then(response => {
                            setUserData(response.data); // Store the fetched data in state
                            setSchoolName((response?.data).schoolName)
                            setCurrentSchoolCode((response?.data).schoolCode);
                            localStorage.setItem('schoolUser', JSON.stringify(response.data))
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                            setLoading(false);
                        });
                    toast.success('logIn successfully');
                    setLoading(false);

                    // setAuthToken(result.user, accountType)

                    navigate('/');
                })
                .catch(err => {
                    toast.error(err.message);
                    console.log(err);
                    setLoading(false);
                })

        }
        else {
            toast.error("You Don't have the permission to use this site");
            setLoading(false)
            return;
        }


    }



    const handleToResetPassword = () => {
        resetPassword(userEmail)
            .then(() => {
                toast.success('Please check your email to reset')
                setLoading(false);
            })
            .catch(err => {
                toast.error(err.message);
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <div className='flex justify-center items-center py-8  drop-shadow-2xl h-screen bg-gradient-to-l from-blue-900 via-slate-900 to-black'>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign in</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        {/* <div className="form-control">
                            <div>
                                <label htmlFor='id' className='block mb-2 text-sm text-left'>
                                    School ID
                                </label>
                                <input
                                    onBlur={event => setUserEmail()}
                                    type='digit'
                                    name='Id'
                                    id='School_Id'
                                    value={currentSchoolCode}
                                    readOnly
                                    required
                                    placeholder='Enter school Id'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>
                        </div> */}
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm text-left'>
                                Email address
                            </label>
                            <input
                                onBlur={event => setUserEmail()}
                                onChange={handleToEmail}
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='w-full px-8 py-3 font-semibold rounded-md bg-red-900 hover:bg-gray-700 hover:text-white text-gray-100 bg-gradient-to-r from-purple-400 to-green-600'
                        >
                            {loading ? <BtnSpinner /> : 'Sign in'}

                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button onClick={handleToResetPassword} className='text-xs hover:underline text-gray-400'>
                        Forgot password?
                    </button>
                </div>

                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link to={`/register`} className='hover:underline text-gray-600'>
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default LogIn
