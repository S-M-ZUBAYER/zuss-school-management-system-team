import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import DisplaySpinner from '../Shared/Spinners/DisplaySpinner';
import BtnSpinner from '../Shared/Spinners/BtnSpinner';
import SliderImgs from './SliderImgs';
// import { globalVariable } from '../../App';

const MainAdmin = () => {
    const { schoolName, schools, setSchools, setSchoolName, currentSchoolCode, setCurrentSchoolCode } = useContext(AuthContext)


    //declare useState to get the update value
    const [name, setName] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolCode, setSchoolCode] = useState('');
    const [schoolBackgroundImg, setSchoolBackgroundImg] = useState('');
    const [schoolBannerImg, setSchoolBannerImg] = useState('');
    const [schoolLocation, setSchoolLocation] = useState('');
    const [aboutSchool, setAboutSchool] = useState('');
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);




    useEffect(() => {
        const fetchSchools = async () => {
            setLoading(true);
            try {
                // Send a GET request to retrieve all schools
                const response = await axios.get('https://zuss-school-management-system-server-site.vercel.app/api/schools');
                setSchools(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                // Handle the error as needed
            }
        };

        fetchSchools();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setBtnLoading(true);
        console.log(name, schoolEmail, schoolCode, schoolLocation, aboutSchool, schoolBannerImg, schoolBackgroundImg);
        if (name === "" || schoolEmail === "" || schoolCode === "" || schoolLocation === "" || aboutSchool === "" || schoolBannerImg === "" || schoolBackgroundImg === "") {
            toast.error("please input all the information properly");
            setBtnLoading(false);
            return;
        }
        const newSchool = {
            name,
            schoolEmail,
            schoolCode,
            schoolLocation,
            aboutSchool,
            schoolBannerImg,
            schoolBackgroundImg
        }

        try {
            // Send the newSchool object to the API endpoint
            const response = await axios.post('https://zuss-school-management-system-server-site.vercel.app/api/schools', newSchool);
            console.log(response.data); // Handle the response data as needed
            toast.success("New school added successfully")
            // Update the schools state with the newSchool added
            const updatedSchools = [...schools, newSchool];
            setSchools(updatedSchools);

            // Reset the form fields
            setName('');
            setSchoolEmail('');
            setSchoolCode('');
            setSchoolBackgroundImg('');
            setSchoolBannerImg('');
            setSchoolLocation('');
            setAboutSchool('');
            setBtnLoading(false);
        } catch (error) {
            console.error(error);
            toast.error(error)
            setBtnLoading(false);
            // Handle the error as needed
        };

    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];


        // Check if a file is selected
        if (file) {
            try {
                // Create a FormData object to send the file to the server
                const formData = new FormData();
                formData.append('image', file);

                // Send the image to the hosting service (imgbb in this case)
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`, {
                    method: 'POST',
                    body: formData,
                });

                // Parse the response JSON
                const data = await response.json();

                // Access the image URL from the response and log it
                const imageUrl = data.data.url;
                setSchoolBannerImg(imageUrl);

            } catch (error) {
                console.error('Error uploading image:', error);

            }
        }
        else {
            toast.error("Please provide proper Image")

        }
    };
    const handleBgImageUpload = async (event) => {
        const file = event.target.files[0];


        // Check if a file is selected
        if (file) {
            try {
                // Create a FormData object to send the file to the server
                const formData = new FormData();
                formData.append('image', file);

                // Send the image to the hosting service (imgbb in this case)
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`, {
                    method: 'POST',
                    body: formData,
                });

                // Parse the response JSON
                const data = await response.json();

                // Access the image URL from the response and log it
                const imageUrl = data.data.url;
                setSchoolBackgroundImg(imageUrl);

            } catch (error) {
                console.error('Error uploading image:', error);

            }
        }
        else {
            toast.error("Please provide proper Image")

        }
    };


    const [editingSchool, setEditingSchool] = useState(null);

    const deleteSchool = async (schoolId, schoolName, index) => {
        const confirmed = window.confirm(`Are you sure you want to delete this ${schoolName} ?`);

        if (confirmed) {
            try {
                const confirmed = window.confirm(`Are you sure to delete ${schoolName} site and information?`);
                if (!confirmed) {
                    return;
                }
                // Send a DELETE request to remove the school
                await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/schools/${schoolId}`);
                toast.success(` ${schoolName} site and information deleted successfully`)
                // fetchSchools(); // Fetch the updated schools after deletion
                const updatedSchools = [...schools];
                updatedSchools.splice(index, 1);
                setSchools(updatedSchools);
            } catch (error) {
                console.error(error);
                toast.error(error)
            }
        }

    };

    // const handleDelete = async (schoolId) => {
    //     try {
    //       // Send a DELETE request to remove the school
    //       await axios.delete(`https://zuss-school-management-system-server-site.vercel.app/api/schools/${schoolId}`);
    //       fetchSchools(); // Fetch the updated schools after deletion
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };


    const editSchool = (index) => {
        setEditingSchool(schools[index]);
        console.log(schools[index])
    };

    // const updateSchool = () => {
    //     console.log(editingSchool)
    //     // Perform the update logic here
    //     // You can use the editingSchool state to access the updated values
    //     // and update the schools array accordingly
    //     // After updating, setEditingSchool(null) to close the modal

    // };


    const updateSchool = async (schoolId, schoolName) => {

        // console.log(schools, schoolId, editingSchool)

        try {
            await axios.put(`https://zuss-school-management-system-server-site.vercel.app/api/schools/${schoolId}`, editingSchool);
            toast.success(`${schoolName} information update successfully`)
            const restSchools = schools.filter((school) => school?._id !== schoolId)
            //   fetchSchools();
            setSchools([...restSchools, editingSchool])
            setEditingSchool(null);
        } catch (error) {
            console.error(error);
        }
        // console.log(schools)
    };





    const handleToSetSchool = (schoolName, schoolCode) => {
        setSchoolName(schoolName);
        setCurrentSchoolCode(schoolCode)
    }



    return (

        <div className="bg-gray-900 bg-gradient-to-l from-blue-900 via-slate-900 to-black">
            <Navbar></Navbar>
            {

            }
            <div>

                <div className="bg-lime-200 pt-5 pb-10 md:w-8/12 md:mx-auto">
                    <h1 className="text-center text-lg font-bold my-5 bg-emerald-300 py-2 md:w-11/12 md:mx-auto">Please input the School information to create new site </h1>
                    <form className="mt-10 text-start md:w-7/12 mx-auto bg-amber-500 p-4 mb-5" onSubmit={handleSubmit} >

                        <label className="mr-2" htmlFor="name">School Name:</label>
                        <div>
                            <input placeholder="Enter School Name" type="text" className="my-3 w-full pl-1" id="name" value={name} onChange={(event) => setName(event.target.value)} /><br />
                        </div>

                        <label className="mr-3" htmlFor="email">School Email:</label>
                        <div>
                            <input placeholder="Enter School Email" type="email" className="my-3 w-full pl-1" id="email" value={schoolEmail} onChange={(event) => setSchoolEmail(event.target.value)} /><br />
                        </div>

                        <label className="mr-3" htmlFor="code">School code:</label>
                        <div>
                            <input placeholder="Enter School Code" type="digit" className="my-3 w-full pl-1" id="code" value={schoolCode} onChange={(event) => setSchoolCode(event.target.value)} /><br />
                        </div>

                        <label className="mr-3 mt-2" htmlFor="code">School Address:</label>
                        <div>
                            <textarea placeholder="Enter School Address" type="test" className="my-3 w-full pl-1" id="code" value={schoolLocation} onChange={(event) => setSchoolLocation(event.target.value)} /><br />
                        </div>

                        <label className="mr-3 mt-2" htmlFor="code">About Shool:</label>
                        <div>
                            <textarea placeholder="Write Something About School" type="text" className="my-3 w-full pl-1" id="code" value={aboutSchool} onChange={(event) => setAboutSchool(event.target.value)} /><br />
                        </div>
                        {/* <label htmlFor="name">School Address:</label>
                <input type="text" className="my-3" id="name" value={address} onChange={(event) => setAddress(event.target.value)} /><br />

                <label htmlFor="message">About:</label>
                <textarea id="message" value={about} onChange={(event) => setAbout(event.target.value)}></textarea><br /> */}

                        <label htmlFor="" className="py-2 mt-5">Please select a image for Banner</label>
                        <div>
                            <input type="file" className="mt-2 " accept="image/*" onChange={handleBgImageUpload} />
                        </div>

                        <label htmlFor="" className="py-2 ">Please select a image for about section</label>
                        <div>
                            <input type="file" className="mt-2 " accept="image/*" onChange={handleImageUpload} />
                        </div>

                        <button className="bg-yellow-200 hover:bg-red-400  py-2 px-5 rounded-lg  my-5" type="submit">
                            {
                                btnLoading ? <BtnSpinner></BtnSpinner> : "Submit"
                            }


                        </button>
                    </form>



                    <div>

                    </div>

                    <SliderImgs></SliderImgs>

                    <div>
                        {
                            loading ? <DisplaySpinner></DisplaySpinner> :
                                <>
                                    <h1 className="text-3xl text-center text-lime-600 bg-cyan-200 py-2 md:w-8/12 md:mx-auto font-bold mt-20">Available School sites</h1>

                                    {schools.map((school, index) => (
                                        <div key={index} className="border border-gray-300 p-2 mb-4 flex justify-between items-center bg-purple-400 w-11/12 mt-8 mx-auto">
                                            <Link to={`https://astha-education-management-system.netlify.app/${school.name}`} onClick={() => handleToSetSchool(school?.name, school?.schoolCode)} className="flex items-center justify-between w-8/12 lg:w-10/12">
                                                <img src={school ? school?.schoolBannerImg : "https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"} alt="School" className="w-8 h-8 rounded-full" />
                                                {/* <img src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png" alt="School" className="w-8 h-8 rounded-full" /> */}
                                                <div className="">
                                                    {school.name}
                                                </div>
                                                <div className="hidden lg:block">
                                                    {school.schoolEmail}
                                                </div>
                                                <div>
                                                    {school.schoolCode}
                                                </div>
                                            </Link>

                                            <div className="flex justify-around items-center mt-2 ml-4 w-4/12 lg:w-2/12">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold py-1 px-2 mr-2"
                                                    onClick={() => editSchool(index)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700  rounded-lg text-white font-bold py-1 px-2"
                                                    onClick={() => deleteSchool(school?._id, school?.name, index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                        }


                        {editingSchool && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded-lg  w-8/12">
                                    <h2 className="text-lg font-bold mb-4">Update School Information</h2>
                                    <div>
                                        <label htmlFor="" className="mr-2">
                                            School Name:
                                        </label>
                                        <input
                                            type="text"
                                            value={editingSchool.name}
                                            onChange={(e) =>
                                                setEditingSchool({ ...editingSchool, name: e.target.value })
                                            }
                                            className="border border-gray-300 p-2 mb-2 w-8/12"
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="" className="mr-2">
                                            School Email:
                                        </label>
                                        <input
                                            type="text"
                                            value={editingSchool.schoolEmail}
                                            readOnly
                                            onChange={(e) =>
                                                setEditingSchool({ ...editingSchool, schoolEmail: e.target.value })
                                            }
                                            className="border border-gray-300 p-2 mb-2 w-8/12"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="" className="mr-2">
                                            School code:
                                        </label>
                                        <input
                                            type="text"
                                            value={editingSchool.schoolCode}
                                            onChange={(e) =>
                                                setEditingSchool({ ...editingSchool, schoolCode: e.target.value })
                                            }
                                            className="border border-gray-300 p-2 mb-2 w-8/12"
                                            placeholder="Code"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="" className="mr-2">
                                            School Address:
                                        </label>
                                        <textarea
                                            type="text"
                                            value={editingSchool.schoolLocation}
                                            onChange={(e) =>
                                                setEditingSchool({ ...editingSchool, schoolLocation: e.target.value })
                                            }
                                            className="border border-gray-300 p-2 mb-2 w-8/12"
                                            placeholder="About"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mr-2">
                                            About School:
                                        </label>
                                        <textarea
                                            type="text"
                                            value={editingSchool.aboutSchool}
                                            onChange={(e) =>
                                                setEditingSchool({ ...editingSchool, aboutSchool: e.target.value })
                                            }
                                            className="border border-gray-300 p-2 mb-2 w-8/12"
                                            placeholder="About"
                                        />
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
                                            onClick={() => updateSchool(editingSchool?._id, editingSchool?.name)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
                                            onClick={() => setEditingSchool(null)}
                                        >
                                            Close
                                        </button>
                                    </div>

                                </div>
                            </div>

                        )}
                    </div>

                </div >
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainAdmin;

