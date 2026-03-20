import { createContext, useEffect, useState } from "react";
import { fetchChanelData } from "../services/fetchChanelData";

export const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
    const [profileDetails, setProfileDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getChannelData = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchChanelData()
                setProfileDetails(data)
            } catch (error) {
                console.error('Error fetching profile:', error)
                setError(error.message || 'Failed to fetch profile')
            } finally {
                setLoading(false)
            }
        }
        getChannelData()
    }, [])
    return (
        <ProfileContext.Provider value={{ profileDetails, loading, error }} >
            {children}
        </ProfileContext.Provider>
    )
}