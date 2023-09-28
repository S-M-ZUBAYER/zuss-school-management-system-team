import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../../../Assets/Images/School.jpg"
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
// import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Navbar = () => {

    const { logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen)

    const { schoolName, user, currentSchoolCode, setSchoolName } = useContext(AuthContext);


    useEffect(() => {
        const fetchSchoolName = async () => {


            try {
                const response = await fetch(` https://zuss-school-management-system-server-site.vercel.app/api/schools/school/${currentSchoolCode}`);
                if (response.ok) {
                    const schoolData = await response.json();


                    setSchoolName(schoolData?.name);

                } else {
                    throw new Error('Failed to fetch staffs');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchSchoolName();
    }, [currentSchoolCode]);

    const handleToLogOut = () => {
        // Removing the item with key "username" from local storage
        localStorage.removeItem("schoolUser");
        logOut()
            .then(() => { })
            .catch(err => {
                console.log(err)
            })
        toast.success("LogOut Successfully")
    }

    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100 text-slate-200 bg-gradient-to-t from-blue-900 via-slate-900 to-black">
            <div className="container flex justify-between h-16">
                <div className="flex items-center">
                    <Link rel="noopener noreferrer" to={`/`} aria-label="Back to homepage" className="flex items-center p-2">
                        <img className="h-10 w-10 rounded-full" src={img} alt="school logo" />
                    </Link>

                    <p className="flex justify-start">
                        <p className="flex items-center justify-start font-semibold px-4 -mb-1  dark:border-transparent">Astha Education Management System</p>
                    </p>
                </div>


                <div className="items-center flex-shrink-0 flex md:mr-10">
                    {
                        user?.email ?
                            <Link to={`/login`} onClick={handleToLogOut}>Log Out</Link> :
                            <Link to={`/login`}><button className="self-center px-8 py-3 rounded">Sign in</button></Link>
                    }

                </div>


            </div>
        </header>
    );
};

export default Navbar;