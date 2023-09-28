







import React, { createContext, useState } from 'react';
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [schoolName, setSchoolName] = useState();

    const authInfo = {
        schoolName,
        setSchoolName
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;