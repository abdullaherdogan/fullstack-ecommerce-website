import { createContext, useContext, useState } from "react";
const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    const [admin, setAdmin] = useState(false);
    const adminInfo = {
        userName: "admin",
        password: "123",
    };
    return (
        <LoginContext.Provider
            value={{
                admin,
                setAdmin,
                adminInfo,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};
export const useLoginContext = () => useContext(LoginContext);
