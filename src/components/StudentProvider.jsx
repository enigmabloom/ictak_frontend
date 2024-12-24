import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [ student, setStudent ] = useState (() => {
        const storedStudent = sessionStorage.getItem("user");
        return storedStudent ? JSON.parse(storedStudent) : null;
    });

    useEffect(() => {
        if(student) {
            sessionStorage.setItem("user", JSON.stringify(student));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [student]);

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            { children }
        </StudentContext.Provider>
    )
}