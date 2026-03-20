import { createContext, useEffect, useState } from "react";
import { fetchChanelData } from "../services/fetchChanelData";

export const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
    const [profileDetails, setProfileDetails] = useState(null)
    useEffect(() => {
        const getChannelData = async () => {
            try {
                const data = await fetchChanelData()
                setProfileDetails(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChannelData()
    }, [])
    return (
        <ProfileContext.Provider value={{ profileDetails }} >
            {children}
        </ProfileContext.Provider>
    )
}