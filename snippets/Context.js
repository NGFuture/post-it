import { createContext, useContext} from "react";
// special object which has Provider property
const MainContext = createContext();

export const MainProvider = ({children}) => {
    const value = {user:"Jonh"};

    return (
        <MainContext.Provider value = {value}>
            {children}
        </MainContext.Provider>
    )
};

export const useMainContext = () => useContext(MainContext);