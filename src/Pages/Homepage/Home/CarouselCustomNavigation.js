// import React from 'react';
// import { Carousel } from 'flowbite-react';
// import { useEffect } from 'react';
// import { useContext } from 'react';
// import { AuthContext } from '../../../context/UserContext';
// import { useState } from 'react';
// import DisplaySpinner from '../../Shared/Spinners/DisplaySpinner';


// function CarouselCustomNavigation() {
//     const [loading, setLoading] = useState(false);
//     const [allImages, setAllImages] = useState([]);
//     const { currentSchoolCode } = useContext(AuthContext);
//     console.log(`https://zuss-school-management-system-server-site.vercel.app/api/SliderImgs/${currentSchoolCode}`)
//     useEffect(() => {
//         const fetchSliderImgs = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(
//                     `https://zuss-school-management-system-server-site.vercel.app/api/SliderImgs/${currentSchoolCode}`
//                 );
//                 if (response.ok) {
//                     const ImgData = await response.json();
//                     console.log(ImgData, ImgData)
//                     setAllImages(ImgData);
//                     setLoading(false);
//                 } else {
//                     setLoading(false);
//                     throw new Error('Failed to fetch staffs');
//                 }
//             } catch (error) {
//                 setLoading(false);
//                 console.error('Error:', error);
//                 // Handle error case
//             }
//         };

//         fetchSliderImgs();
//     }, [currentSchoolCode]);

//     if (loading) {
//         return <DisplaySpinner></DisplaySpinner>
//     }

//     console.log(allImages, "allImages")
//     return (
//         <div className="pt-10 md:pt-25 bg-gradient-to-l from-blue-900 via-slate-900 to-black">
//             <div data-aos="fade-down" data-aos-duration="2000" className="mb-5">
//                 <h2 className="mb-6 text-3xl md:text-5xl text-green-400 font-bold pt-20">Show Overview With Images</h2>
//                 <p className="text-gray-200 px-10 md:px-20 text-base font-semibold">When starting a business, one key task is to create a business plan that outlines your goals and how you aim to achieve them. Your business overview is a necessary section that presents these ideas more broadly and provides your audience with background information about your company.</p>
//             </div>
//             {/* <Carousel className="w-10/12 h-[500px] mx-auto  md:mt-20">
//                 {
//                     allImages && allImages.length > 0 && allImages.map((img, index) => {
//                         return <img
//                             alt="pic"
//                             src={`${img.link}`}
//                             className="object-cover w-full h-full object-center rounded-lg"
//                             style={{ objectFit: 'contain' }}
//                         />

//                     })
//                 }

//             </Carousel> */}
//             <Carousel className="w-10/12 h-[500px] mx-auto  md:mt-20">
//                 <img
//                     alt="pic1"
//                     src="https://c0.wallpaperflare.com/preview/534/41/125/school-books-young-adult-education.jpg"
//                     className="object-cover w-full h-full object-center rounded-lg"
//                     style={{ objectFit: 'contain' }}
//                 />
//                 <img
//                     alt="pic2"
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnjAZc2w6O_DaJV3Oaaamt9XZ0FQ1S_yQ1w&usqp=CAU"
//                     className="object-cover w-full h-full object-center rounded-lg"
//                     style={{ objectFit: 'contain' }}
//                 />
//                 <img
//                     alt="pic3"
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuTRsnE-II-uE4PEHXux9lj8-6ouKj49h4A&usqp=CAU"
//                     className="object-cover w-full h-full object-center rounded-lg"
//                     style={{ objectFit: 'contain' }}
//                 />
//                 <img
//                     alt="pic4"
//                     src="https://img.freepik.com/free-photo/top-view-hardback-books-desk-with-coffee-keyboard_23-2148827248.jpg?w=2000"
//                     className="object-cover w-full h-full object-center rounded-lg"
//                     style={{ objectFit: 'contain' }}
//                 />
//                 <img
//                     alt="pic5"
//                     src="https://i.ibb.co/k32XKnw/student1.jpg"
//                     className="object-cover w-full h-full object-center rounded-lg"
//                     style={{ objectFit: 'contain' }}
//                 />
//             </Carousel>
//         </div>
//     );
// }

// export default CarouselCustomNavigation;


import React, { useEffect, useContext, useState } from 'react';
import { Carousel } from 'flowbite-react';
import { AuthContext } from '../../../context/UserContext';
import DisplaySpinner from '../../Shared/Spinners/DisplaySpinner';

function CarouselCustomNavigation() {
    const [loading, setLoading] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const { currentSchoolCode } = useContext(AuthContext);

    useEffect(() => {
        const fetchSliderImgs = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://zuss-school-management-system-server-site.vercel.app/api/SliderImgs/${currentSchoolCode}`
                );
                if (response.ok) {
                    const imgData = await response.json();
                    setAllImages(imgData); // Assuming 'links' is an array of image URLs

                    setLoading(false);
                } else {
                    setLoading(false);
                    throw new Error('Failed to fetch slider images');
                }
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchSliderImgs();
    }, [currentSchoolCode]);

    if (loading) {
        return <DisplaySpinner />;
    }

    // console.log(allImages, "ALLiMG")
    return (
        <>
            {
                allImages && allImages.length > 0 &&

                <div className="pt-10 md:pt-25 bg-gradient-to-l from-blue-900 via-slate-900 to-black">
                    <div data-aos="fade-down" data-aos-duration="2000" className="mb-5">
                        <h2 className="mb-6 text-3xl md:text-5xl text-green-400 font-bold pt-20">Show Overview With Images</h2>
                        <p className="text-gray-200 px-10 md:px-20 text-base font-semibold">When starting a business, one key task is to create a business plan that outlines your goals and how you aim to achieve them. Your business overview is a necessary section that presents these ideas more broadly and provides your audience with background information about your company.</p>
                    </div>
                    <Carousel className="w-10/12 h-[500px] mx-auto  md:mt-20">
                        {allImages && allImages.length > 0 && allImages.map((imgUrl, index) => (
                            <img
                                key={index}
                                alt={`pic${index}`}
                                src={imgUrl?.link}
                                className="object-cover w-full h-full object-center rounded-lg"
                                style={{ objectFit: 'contain' }}
                            />
                        ))}
                    </Carousel>
                </div>
            }
        </>

    );
}

export default CarouselCustomNavigation;

