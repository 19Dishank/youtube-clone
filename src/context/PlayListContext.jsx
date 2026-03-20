import { createContext, useEffect, useState } from "react";
import { fetchChanelData } from "../services/fetchChanelData";
import { fetchPlaylist } from "../services/fetchPlaylist";

export const PlayListContext = createContext()

export const PlayListContextProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getPlaylist = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchPlaylist(20)
                setPlaylist(data)
            } catch (error) {
                console.error('Error fetching playlist:', error)
                setError(error.message || 'Failed to fetch playlist')
            } finally {
                setLoading(false)
            }
        }
        getPlaylist()
    }, [])
    return (
        <PlayListContext.Provider value={{ playlist, loading, error }} >
            {children}
        </PlayListContext.Provider>
    )
}