import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { AuthContext } from '../../context/UserContext';

const Staff = () => {

    const { schoolName } = useContext(AuthContext);

    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-gradient-to-l from-blue-900 via-slate-900 to-black">

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side text-gray-200 font-bold text-xl bg-gradient-to-l from-blue-900 via-slate-900 to-black">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu py-4 w-70 text-base">

                        {
                            // isAdmin && 
                            <>
                                <li><Link to={`/${schoolName}/staff/salary`}>Salary Status</Link></li>
                                <li><Link to={`/${schoolName}/staff/calender`}>Academic Calender</Link></li>
                                <li><Link to={`/${schoolName}/staff/leave`}>leave application</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Staff;