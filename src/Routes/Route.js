import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import MainAdmin from "../Pages/MainAdminPage/MainAdmin";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><MainAdmin></MainAdmin></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },

    // {

    //     path: "/:name",
    //     element: <Main></Main>,
    //     errorElement: <ErrorPage></ErrorPage>,
    //     children: [
    //         {
    //             path: "/:name",
    //             element: <Home></Home>,
    //         },
    //         {
    //             path: "/:name/contact",
    //             element: <Contact></Contact>
    //         },
    //         {
    //             path: "/:name/login",
    //             element: <Login></Login>
    //         },
    //         {
    //             path: "/:name/register",
    //             element: <Register></Register>
    //         },
    //     ]
    // },

    // {

    //     path: '/:name/admin',
    //     element: <Admin></Admin>,
    //     children: [
    //         {
    //             path: '/:name/admin/dashboard',
    //             element: <AdminDashboard></AdminDashboard>
    //         },
    //         {
    //             path: '/:name/admin/calender',
    //             element: <AcademicCalender></AcademicCalender>
    //         },
    //         {
    //             path: '/:name/admin/staff',
    //             element: <AllStaffInfo></AllStaffInfo>
    //         },
    //         {
    //             path: '/:name/admin/student',
    //             element: <AllStudent></AllStudent>
    //         },
    //         {
    //             path: '/:name/admin/student/details/:studentId',
    //             element: <StudentsDetailsPage></StudentsDetailsPage>
    //         },
    //         {
    //             path: '/:name/admin/idCard',
    //             element: <StdTcrIdCard></StdTcrIdCard>
    //         },
    //         {
    //             path: '/:name/admin/salary',
    //             element: <AddSalary></AddSalary>
    //         },
    //         {
    //             path: '/:name/admin/addNotice',
    //             element: <AddNotice></AddNotice>
    //         },
    //         {
    //             path: '/:name/admin/addEvents',
    //             element: <AddEvents></AddEvents>
    //         },
    //         {
    //             path: '/:name/admin/Student_attendance',
    //             element: <StudentAttendanceStatus></StudentAttendanceStatus>
    //         },
    //         {
    //             path: '/:name/admin/teacher_attendance',
    //             element: <Tcr_Atd_Sheet></Tcr_Atd_Sheet>
    //         },
    //         {
    //             path: '/:name/admin/addStudent',
    //             element: <AddStudent></AddStudent>
    //         },
    //         {
    //             path: '/:name/admin/admissionProcess',
    //             element: <AdminAdmissionProcess></AdminAdmissionProcess>
    //         },
    //         {
    //             path: '/:name/admin/addStaff',
    //             element: <AddStaff></AddStaff>
    //         },
    //         {
    //             path: '/:name/admin/atnTime',
    //             element: <SchoolStartEndField></SchoolStartEndField>
    //         },
    //         {
    //             path: '/:name/admin/admission',
    //             element: <AdmissionInfo></AdmissionInfo>
    //         },
    //         {
    //             path: '/:name/admin/admissionProcess/details/:applicationId',
    //             element: <ApplicationDetails></ApplicationDetails>
    //         },
    //         {
    //             path: '/:name/admin/class',
    //             element: <AddClassInfo></AddClassInfo>
    //         },
    //         {
    //             path: '/:name/admin/classRoutine',
    //             element: <GenerateClassRoutine></GenerateClassRoutine>
    //         },
    //         {
    //             path: '/:name/admin/transfer',
    //             element: <TransferCertificate></TransferCertificate>
    //         },
    //         {
    //             path: '/:name/admin/character',
    //             element: <CharacterCertificate></CharacterCertificate>
    //         },
    //         {
    //             path: '/:name/admin/completion',
    //             element: <CourseCompletionCertificate></CourseCompletionCertificate>
    //         },
    //         {
    //             path: '/:name/admin/paymentSystem',
    //             element: <Payment></Payment>
    //         },
    //         {
    //             path: '/:name/admin/term&subjects',
    //             element: <AddTermAndSubject></AddTermAndSubject>
    //         },

    //     ]

    // }


])