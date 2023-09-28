import React, { useState, useContext, useEffect } from "react";
import "./App.css";
// import { getMonth } from "./util";
// import Month from "./components/Month";
// import EventModal from "./components/EventModal";
import CalendarHeader from "./src/Pages/AdminPage/AdminDashboard/AdminPageDashboard/AcademicCalander/CalendarHeader";
import Sidebar from "./src/Pages/AdminPage/AdminDashboard/AdminPageDashboard/AcademicCalander/Sidebar";
import GlobalContext from "./src/AuthProvider/Context/GlobalContext";
import { getMonth } from "date-fns";
import Month from "./src/Pages/AdminPage/AdminDashboard/AdminPageDashboard/AcademicCalander/Month";
import EventModal from "./src/Pages/AdminPage/AdminDashboard/AdminPageDashboard/AcademicCalander/EventModal";
function App() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}

            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currenMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
