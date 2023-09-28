import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/UserContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AddClassInfo = () => {
    const [classNames, setClassNames] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [className, setClassName] = useState([]);
    const [section, setSection] = useState([]);
    const [shift, setShift] = useState([]);

    const { schoolName, currentSchoolCode } = useContext(AuthContext);

    const addClassName = () => {
        if (className.trim() !== '') {
            setClassNames([...classNames, { name: className, sections: [] }]);
            setClassName('');
        }
    };

    const removeClassName = (index) => {
        const updatedClassNames = classNames.filter((_, i) => i !== index);
        setClassNames(updatedClassNames);
    };

    const addSection = (classIndex) => {
        if (section.trim() !== '') {
            const updatedClassNames = [...classNames];
            updatedClassNames[classIndex].sections.push({ name: section, shifts: [] });
            setClassNames(updatedClassNames);
            setSection('');
        }
    };

    const removeSection = (classIndex, sectionIndex) => {
        const updatedClassNames = [...classNames];
        updatedClassNames[classIndex].sections.splice(sectionIndex, 1);
        setClassNames(updatedClassNames);
    };

    const addShift = (classIndex, sectionIndex) => {
        if (shift.trim() !== '') {
            const updatedClassNames = [...classNames];
            updatedClassNames[classIndex].sections[sectionIndex].shifts.push(shift);
            setClassNames(updatedClassNames);
            setShift('');
        }
    };

    const removeShift = (classIndex, sectionIndex, shiftIndex) => {
        const updatedClassNames = [...classNames];
        updatedClassNames[classIndex].sections[sectionIndex].shifts.splice(shiftIndex, 1);
        setClassNames(updatedClassNames);
    };





    useEffect(() => {
        // Function to fetch classInfo based on schoolCode
        const fetchClassInfo = async () => {
            try {
                const response = await axios.get(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`);
                setClassNames((response.data)?.classInfo); // Assuming the response contains classInfo data
            } catch (error) {
                console.error('Error fetching classInfo:', error);
            }
        };

        fetchClassInfo();
    }, [currentSchoolCode]);



    const handleToAdd = async () => {
        try {
            // Make PATCH request to backend
            const response = await axios.patch(`https://zuss-school-management-system-server-site.vercel.app/api/classes/${currentSchoolCode}`, {
                schoolName: schoolName,
                schoolCode: currentSchoolCode,
                classInfo: classNames
            });

            // Clear form fields
            setClassName('');

            // Show success toast
            toast.success('Updated ClassName, Section, and Shift successfully');
        } catch (error) {
            // Show error toast if request fails
            toast.error('Failed to update ClassName, Section, and Shift');
        }
    };


    return (

        <div>
            <div className="p-4 text-white">
                <h1 className="text-2xl font-bold mb-4">Class, Section, Shift Management</h1>

                <div className="flex mb-4">
                    <input
                        type="text"
                        className="w-1/2 px-4 py-2 border rounded-md mr-2 text-black"
                        placeholder="Enter ClassName"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={addClassName}>
                        Add ClassName
                    </button>
                </div>

                {classNames?.map((item, classIndex) => (
                    <div key={classIndex} className="border rounded-md p-4 mb-4">
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <button
                                className="px-2 py-1 text-red-600"
                                onClick={() => removeClassName(classIndex)}
                            >
                                Remove ClassName
                            </button>
                        </div>

                        <div className="flex mb-4">
                            <input
                                type="text"
                                className="w-1/2 px-4 py-2 border rounded-md mr-2 text-black"
                                placeholder="Enter Section"
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                onClick={() => addSection(classIndex)}
                            >
                                Add Section
                            </button>
                        </div>

                        {item.sections.map((sectionItem, sectionIndex) => (
                            <div key={sectionIndex} className="mb-2">
                                <div className="flex justify-between mb-2">
                                    <p className="w-1/2 px-4 py-2  rounded-md mr-2 text-green-400">
                                        {sectionIndex + 1}. {sectionItem.name}
                                    </p>
                                    <button
                                        className="px-2 py-1 text-red-600"
                                        onClick={() => removeSection(classIndex, sectionIndex)}
                                    >
                                        Remove Section
                                    </button>
                                </div>
                                <div className="flex mb-2">
                                    <input
                                        type="text"
                                        className="w-1/2 px-4 py-2 border rounded-md mr-2 text-black"
                                        placeholder="Enter Shift"
                                        value={shift}
                                        onChange={(e) => setShift(e.target.value)}
                                    />
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                        onClick={() => addShift(classIndex, sectionIndex)}
                                    >
                                        Add Shift
                                    </button>
                                </div>
                                {sectionItem.shifts.map((shiftItem, shiftIndex) => (
                                    <div key={shiftIndex} className="flex justify-between">
                                        <p className="w-1/2 px-4 py-2 rounded-md mr-2 text-blue-500">
                                            {shiftIndex + 1}. {shiftItem}
                                        </p>
                                        <button
                                            className="px-2 py-1 text-red-600"
                                            onClick={() => removeShift(classIndex, sectionIndex, shiftIndex)}
                                        >
                                            Remove Shift
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleToAdd}>
                    Add
                </button>
            </div>
            <div className="p-4 text-white mb-10">
                <h2 className="font-bold text-3xl text-center my-8">Show the ClassName, Section and Shift</h2>
                {classNames?.map((classItem, classIndex) => (
                    <div key={classItem.name}>
                        <h2 className="text-xl font-bold">
                            {`${classIndex + 1}. ${classItem.name}`}
                        </h2>
                        <div className="ml-4">
                            {classItem.sections.map((section, sectionIndex) => (
                                <div key={section.name}>
                                    <h3 className="text-lg font-semibold">
                                        {`${classIndex + 1}.${sectionIndex + 1} ${section.name}`}
                                    </h3>
                                    <div className="ml-8">
                                        {section.shifts.map((shift, shiftIndex) => (
                                            <p key={shift} className="mb-1">
                                                {`${classIndex + 1}.${sectionIndex + 1}.${shiftIndex + 1} ${shift}`}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
};

export default AddClassInfo;
