import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import toast from 'react-hot-toast';

function SliderImgs() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageLink, setImageLink] = useState(''); // To store image link
    const [uploading, setUploading] = useState(false);
    const { currentSchoolCode, schoolName } = useContext(AuthContext);

    // Function to handle image selection
    const handleImageSelection = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if there's a selected image
        if (!selectedImage) {
            return;
        }

        try {
            setUploading(true);

            // Create a new FormData object for the single image
            const formData = new FormData();
            formData.append('image', selectedImage);

            // Send formData to ImgBB API to upload the image
            const imgbbResponse = await axios.post(
                'https://api.imgbb.com/1/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        key: process.env.REACT_APP_imgbbKey, // Replace with your ImgBB API key
                    },
                }
            );

            // Extract the image link from the ImgBB response
            const imageLink = imgbbResponse.data.data.url;

            // Now, you can send this link to your backend to store
            // Make an API request to your backend with the image link

            // Construct the data object to send to your backend
            const sliderImg = {
                schoolName,
                schoolCode: currentSchoolCode,
                link: imageLink,
            };

            console.log(sliderImg)

            // Make a PATCH request to update the data
            const response = await axios.post(`https://zuss-school-management-system-server-site.vercel.app/api/SliderImgs/${currentSchoolCode}`, sliderImg);

            console.log('Data updated successfully:', response.data);
            toast.success("image uploaded successfully")

            // Set the image link state
            setImageLink(imageLink);

            // Reset state or perform any other necessary actions after uploading
            setSelectedImage(null);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-lime-700 mt-10 mb-5">Slider Images Uploader</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                />
                <button className="bg-green-400 px-3 py-1 rounded-lg" type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </form>
            {imageLink && (
                <div>
                    <h3>Uploaded Image Link:</h3>
                    <a href={imageLink} target="_blank" rel="noopener noreferrer">
                        {imageLink}
                    </a>
                </div>
            )}
        </div>
    );
}

export default SliderImgs;
