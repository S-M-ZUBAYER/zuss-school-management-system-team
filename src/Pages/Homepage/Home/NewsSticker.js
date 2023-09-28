import React, { useState, useEffect, useContext } from 'react';
import './NewsTicker.css'; // Import your CSS file for styling
import { AuthContext } from '../../../context/UserContext';

const NewsTicker = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newsItems, setNewsItems] = useState([]);

    const { currentSchoolCode } = useContext(AuthContext);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch(`https://zuss-school-management-system-server-site.vercel.app/api/NoticeLiner/${currentSchoolCode}`);
                if (response.ok) {
                    const noticesData = await response.json();
                    setNewsItems(noticesData);
                } else {
                    throw new Error('Failed to fetch notices');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error case
            }
        };

        fetchNotices();
    }, [currentSchoolCode]);
    console.log(newsItems, currentSchoolCode)

    useEffect(() => {
        const interval = setInterval(() => {
            const newItem = newsItems[currentIndex];
            setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
            setVisibleItems((prevItems) => {
                if (prevItems.length < 3) {
                    return [...prevItems, newItem];
                } else {
                    const newItems = [...prevItems];
                    newItems.shift();
                    newItems.push(newItem);
                    return newItems;
                }
            });
        }, 3000); // Adjust the interval duration as needed

        return () => {
            clearInterval(interval);
        };
    }, [newsItems, currentIndex]);

    return (
        <div className="news-ticker-container">
            <div className="news-ticker">
                {newsItems.map((item, index) => (
                    <div key={index} className="news-item text-xl bg-blue-800 text-white">
                        {item.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;
